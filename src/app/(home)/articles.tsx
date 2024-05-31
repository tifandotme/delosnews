"use client"

import { getArticles } from "@/app/(home)/actions"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { FILTERS } from "@/lib/constants"
import { cn, unslugify } from "@/lib/utils"
import { useInfiniteQuery } from "@tanstack/react-query"
import { LoaderCircle } from "lucide-react"
import { parseAsStringLiteral, useQueryState } from "nuqs"
import { useRef } from "react"
import { useDebounce } from "use-debounce"

const PER_PAGE = 10

export function Articles() {
  const [filter, setFilter] = useQueryState(
    "filter",
    parseAsStringLiteral(FILTERS),
  )
  const [search, setSearch] = useQueryState("search")
  const [debouncedSearch] = useDebounce(search, 500)

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
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

  if (status === "error") return <div>Error: {error.message}</div>

  return (
    <div className="bg-red-200">
      <div className="flex gap-2">
        <Input
          type="text"
          onChange={(e) => setSearch(e.target.value ? e.target.value : null)}
          value={search ?? ""}
        />
        <Select
          defaultValue="emailed"
          value={filter ?? "emailed"}
          onValueChange={(val) => setFilter(val as (typeof FILTERS)[number])}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue>Most {unslugify(filter ?? "emailed")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="emailed">Most Emailed</SelectItem>
            <SelectItem value="shared">Most Shared</SelectItem>
            <SelectItem value="viewed">Most Viewed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul className="flex flex-col">
        {status === "pending" ?
          <>Loading...</>
        : data?.pages
            .flatMap((page) => page)
            .map((article) => (
              <li key={article.id} className="flex-1 p-4">
                {article.title}
              </li>
            ))
        }
      </ul>
      <div
        ref={loadMoreRef}
        className={cn("mx-auto w-[100px]", !hasNextPage && "hidden")}
      >
        {isFetchingNextPage && <LoaderCircle className="size-4 animate-spin" />}
      </div>
    </div>
  )
}
