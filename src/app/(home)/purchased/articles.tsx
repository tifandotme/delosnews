"use client"

import { ArticleCard } from "@/components/articles/article-card"
import { buttonVariants } from "@/components/ui/button"
import { useStore } from "@/lib/stores"
import { cn, constructArticleHref } from "@/lib/utils"
import { MoveUpRight } from "lucide-react"
import Link from "next/link"

export function Articles() {
  const { purchasedArticles } = useStore((state) => state)

  return (
    <>
      <h2 className="mb-8 font-serif text-5xl font-semibold opacity-90 sm:ml-2 sm:text-6xl">
        Purchased Articles ({purchasedArticles.length})
      </h2>
      <ul className="flex flex-col gap-6">
        {purchasedArticles.length === 0 ?
          <li className="my-20 text-center text-muted-foreground">
            You have not purchased any articles yet
          </li>
        : purchasedArticles.map((article) => (
            <ArticleCard key={article._id} className="!h-fit">
              <div className="flex w-full flex-col">
                <span className="text-sm font-medium uppercase tracking-widest text-red-600 dark:text-red-400">
                  {article.section_name}
                </span>
                <h3 className="font-serif text-3xl font-semibold">
                  {article.headline.main}
                </h3>
                <p className="line-clamp-3 text-muted-foreground">
                  {article.abstract}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  className={cn(buttonVariants({ variant: "outline" }))}
                  href={constructArticleHref(
                    article.uri,
                    article.document_type,
                  )}
                >
                  Detail
                </Link>
                <Link
                  className={cn(buttonVariants())}
                  href={article.web_url}
                  target="_blank"
                >
                  Read
                  <MoveUpRight className="ml-1" size="1.1em" />
                </Link>
              </div>
            </ArticleCard>
          ))
        }
      </ul>
    </>
  )
}
