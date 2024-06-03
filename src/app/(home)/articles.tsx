"use client"

import { getArticles } from "@/app/(home)/actions"
import {
  ArticleCard,
  ArticleSkeleton,
} from "@/components/articles/article-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDebounce } from "@/hooks/use-debounce"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { FILTERS, PER_PAGE } from "@/lib/constants"
import { cn, constructArticleHref, toSentenceCase } from "@/lib/utils"
import * as SelectPrimitive from "@radix-ui/react-select"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { Filter, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { useRef } from "react"

export function Articles() {
  const [search, setSearch] = useQueryState("search")
  const debouncedSearch = useDebounce(search)
  const [filter, setFilter] = useQueryState(
    "filter",
    parseAsStringLiteral(FILTERS),
  )

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useSuspenseInfiniteQuery({
    queryKey: ["articles", filter, debouncedSearch],
    /**
     * Ideally, search and pagination should be handled by the API server.
     * But, since NYT Most Popular API doesn't support this, we have to do it on the client.
     *
     * Additionally, API only gives us 20 articles at most regardless of the filter option.
     */
    queryFn: async ({ pageParam }) => {
      const data = await getArticles(filter ?? "emailed")
      if (debouncedSearch) {
        return data.filter((article) =>
          article.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
        )
      }
      return data.slice(pageParam, pageParam + PER_PAGE)
    },
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.length === 0 || lastPage.length < PER_PAGE) {
        return null
      }
      return lastPageParam + PER_PAGE
    },
    initialPageParam: 0,
  })

  // For handling infinite scroll. If the Load More div is in viewport, fetch next page.
  const loadMoreRef = useRef<HTMLDivElement>(null)
  useIntersectionObserver({
    target: loadMoreRef,
    onIntersect: fetchNextPage,
    enabled: !isFetchingNextPage && hasNextPage,
  })

  const inputSearchRef = useRef<HTMLInputElement>(null)

  if (status === "error") return <div>Error: {error?.message}</div>
  const articles = data?.pages.flatMap((page) => page)

  return (
    <>
      <div className="mb-14 flex w-full items-center justify-center gap-2">
        <div className="relative w-full max-w-[500px]">
          <Input
            ref={inputSearchRef}
            className="peer border-0 border-b-2 focus-visible:border-foreground focus-visible:ring-0"
            type="text"
            onChange={(e) => setSearch(e.target.value ? e.target.value : null)}
          />
          <Search
            strokeWidth={2.5}
            className={cn(
              "absolute inset-y-0 start-0 my-auto text-border peer-focus:hidden",
              search && "hidden",
            )}
          />
          <Button
            className={cn(
              "absolute inset-y-0 end-0 my-auto text-xs uppercase text-muted-foreground",
              !search && "hidden",
            )}
            variant="unstyled"
            type="button"
            onClick={() => {
              setSearch(null)
              if (inputSearchRef.current) {
                inputSearchRef.current.value = ""
              }
            }}
          >
            Clear
          </Button>
        </div>
        <Select
          defaultValue="emailed"
          value={filter ?? "emailed"}
          onValueChange={(val) => setFilter(val as (typeof FILTERS)[number])}
        >
          <SelectTrigger
            className="w-[111px] shrink-0 justify-start gap-1 border-0 px-0 font-medium text-muted-foreground"
            includeIcon={false}
          >
            <SelectPrimitive.Icon asChild>
              <Filter strokeWidth={2.5} size="1rem" />
            </SelectPrimitive.Icon>
            <SelectValue>
              Most {toSentenceCase(filter ?? "emailed")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {FILTERS.map((f) => (
              <SelectItem key={f} value={f}>
                Most {toSentenceCase(f)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <ul className="flex flex-col gap-6">
        {articles.length === 0 ?
          <li className="my-20 text-center text-muted-foreground">
            No articles found.
          </li>
        : articles.map((article) => {
            const media = article.media[0]?.["media-metadata"] ?? []
            const imageUrl = media[media.length - 1]?.url
            return (
              <Link
                key={article.id}
                className="group block"
                href={constructArticleHref(article.uri, article.type)}
              >
                <ArticleCard className="sm:animate-translate sm:hover:border-neutral-300 sm:hover:bg-muted/20 dark:sm:hover:border-neutral-700/60">
                  <div className="flex w-full flex-col">
                    <span className="text-sm font-medium uppercase tracking-widest text-red-600 dark:text-red-400">
                      {article.section}
                    </span>
                    <h3 className="font-serif text-3xl font-semibold">
                      {article.title}
                    </h3>
                    <p className="line-clamp-3 text-muted-foreground">
                      {article.abstract}
                    </p>
                  </div>
                  {imageUrl && (
                    <Image
                      className="aspect-square h-full w-auto shrink-0 object-cover lg:aspect-[16/10]"
                      src={imageUrl}
                      width={0}
                      height={0}
                      alt={article.media[0]?.caption ?? article.title}
                      sizes="100vw"
                      loading="lazy"
                      unoptimized
                    />
                  )}
                </ArticleCard>
              </Link>
            )
          })
        }
      </ul>
      <div ref={loadMoreRef} className={cn(!hasNextPage && "hidden")} />
      {isFetchingNextPage &&
        Array.from({ length: PER_PAGE }).map((_, i) => (
          <ArticleSkeleton key={i} />
        ))}
    </>
  )
}
