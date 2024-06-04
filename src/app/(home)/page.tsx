import { getArticles } from "@/app/(home)/actions"
import { Articles } from "@/app/(home)/articles"
import { FILTERS, PER_PAGE } from "@/lib/constants"
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query"

export default async function Home({
  searchParams,
}: {
  searchParams: {
    search: string
    filter: (typeof FILTERS)[number]
  }
}) {
  // Prefetch the first page of articles
  const queryClient = new QueryClient()
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["articles", FILTERS[0], ""],
    queryFn: async () => {
      const data = await getArticles("emailed")
      return data.slice(0, PER_PAGE)
    },
    initialPageParam: 0,
  })

  return (
    <div className="container-main min-h-[calc(100vh-var(--masthead-height))] pt-14 max-masthead:mt-28">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Articles initialSearchParams={{ ...searchParams }} />
      </HydrationBoundary>
    </div>
  )
}
