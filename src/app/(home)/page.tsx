import { getArticles } from "@/app/(home)/actions"
import { Articles } from "@/app/(home)/articles"
import { PER_PAGE } from "@/lib/constants"
import { getQueryClient } from "@/lib/react-query"
import { HydrationBoundary, dehydrate } from "@tanstack/react-query"

export default function Home() {
  // Prefetch the first page of articles with "emailed" as initial filter
  const queryClient = getQueryClient()
  void queryClient.prefetchInfiniteQuery({
    queryKey: ["articles", null, null],
    queryFn: async () => {
      const data = await getArticles("emailed")
      return data.slice(0, PER_PAGE)
    },
    initialPageParam: 0,
  })

  return (
    <div className="container-main min-h-[calc(100vh-var(--masthead-height))] pt-14 max-masthead:mt-28">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Articles />
      </HydrationBoundary>
    </div>
  )
}
