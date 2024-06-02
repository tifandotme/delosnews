"use client"

import { getArticles } from "@/app/(home)/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { useDebounce } from "@/hooks/use-debounce"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { FILTERS, PER_PAGE } from "@/lib/constants"
import { cn, toSentenceCase } from "@/lib/utils"
import * as SelectPrimitive from "@radix-ui/react-select"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query"
import { Filter, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { useRef } from "react"

export function Articles({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [search, setSearch] = useQueryState("search")
  const debouncedSearch = useDebounce(search, 500)
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

  if (status === "error") return <div>Error: {error?.message}</div>
  const articles = data?.pages.flatMap((page) => page)

  return (
    <div
      className={cn(
        "container-main min-h-[calc(100vh-var(--masthead-height))] pt-14",
        className,
      )}
      {...props}
    >
      <div className="mb-14 flex w-full items-center justify-center gap-2">
        <div className="relative w-full max-w-[500px]">
          <Input
            className="peer border-0 border-b-2 focus-visible:border-foreground focus-visible:ring-0"
            type="text"
            onChange={(e) => setSearch(e.target.value ? e.target.value : null)}
            value={search ?? ""}
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
            onClick={() => setSearch(null)}
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
            <SelectItem value="emailed">Most Emailed</SelectItem>
            <SelectItem value="shared">Most Shared</SelectItem>
            <SelectItem value="viewed">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul className="flex flex-col gap-6">
        {articles.length === 0 ?
          <li className="text-center text-muted-foreground">
            No articles found.
          </li>
        : articles.map((article) => {
            const media = article.media[0]?.["media-metadata"] ?? []
            const imageUrl = media[media.length - 1]?.url
            const uri = article.uri
            const articleId = uri.slice(uri.lastIndexOf("/") + 1)
            return (
              <Link
                key={article.id}
                className="group block"
                href={`/${articleId}`}
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
        Array.from({ length: PER_PAGE }).map((_, i) => <ArticleSkeleton key={i} />)}
    </div>
  )
}

function ArticleCard({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLLIElement>) {
  return (
    <article
      className={cn(
        "max-sm flex justify-between gap-2 border-b bg-card pb-6 text-card-foreground max-sm:flex-col max-sm:group-last:border-b-0 sm:h-[300px] sm:border sm:p-6 sm:shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  )
}

function ArticleSkeleton() {
  return (
    <ArticleCard className="!border-0 !shadow-none">
      <div className="flex w-full flex-col">
        <Skeleton className="h-5 w-[10ch]" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="mt-1 h-5 w-full" />
        <Skeleton className="mt-1 h-5 w-[70%]" />
      </div>
      <Skeleton className="aspect-square h-full w-auto shrink-0 object-cover lg:aspect-[16/10]" />
    </ArticleCard>
  )
}
