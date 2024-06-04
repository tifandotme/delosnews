import { OwnershipCard } from "@/app/(home)/[articleId]/ownership-card"
import { formatRelativeDate } from "@/lib/utils"
import type { Definitions, Response } from "@/types/article-search"
import Image from "next/image"
import { notFound } from "next/navigation"

async function getArticleById(articleId: string, isInteractive: boolean) {
  const url = new URL(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json",
  )
  url.searchParams.set(
    "fq",
    `uri:"nyt://${isInteractive ? "interactive" : "article"}/${articleId}"`,
  )
  url.searchParams.set("api-key", process.env.API_KEY as string)
  const res = await fetch(url, {
    cache: "force-cache",
  })
  if (!res.ok) {
    throw new Error("Failed to fetch article")
  }

  const json: Response = await res.json()
  return json.response.docs[0] as Definitions["Article"] | undefined
}

export default async function Article({
  params,
  searchParams,
}: {
  params: { articleId: string }
  searchParams: { type: string }
}) {
  const article = await getArticleById(
    params.articleId,
    searchParams.type === "interactive",
  )
  if (!article) {
    notFound()
  }

  const publishedDate = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(new Date(article.pub_date))

  const cover = article.multimedia.find((media) => media.subtype === "jumbo")

  return (
    <>
      <div className="min-h-[calc(100vh-var(--masthead-height))] pt-14 max-masthead:mt-14">
        <div className="mx-auto max-w-screen-md px-4 sm:px-6">
          <OwnershipCard article={article} />

          <span className="font-medium uppercase tracking-widest text-red-600 dark:text-red-400">
            {article.section_name}
          </span>
          <h2 className="mt-2 font-serif text-[3.25rem] font-extrabold leading-none tracking-tight">
            {article.headline.main}
          </h2>
          <p className="font-serif text-xl italic">{article.abstract}</p>
          <div className="mt-4 inline-block text-sm text-muted-foreground">
            <span>{article.byline.original}</span>
            <span className="mx-2 text-xs">&bull;</span>
            <time dateTime={article.pub_date}>
              {publishedDate} ({formatRelativeDate(article.pub_date)})
            </time>
          </div>
        </div>
        {cover && (
          <figure className="mx-auto mt-10 max-w-screen-lg">
            <Image
              className="aspect-[16/10] h-auto w-full object-cover"
              src={`https://static01.nyt.com/${cover.url}`}
              width={0}
              height={0}
              alt={article.headline.main}
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 30vw"
              aria-label="Cover"
            />
          </figure>
        )}
      </div>
    </>
  )
}
