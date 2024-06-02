"use server"

import type { FILTERS } from "@/lib/constants"
import type { Response } from "@/types/most-popular"

const FETCH_DELAY = process.env.FETCH_DELAY as string

/**
 * Server action to fetch articles from the NYT API. Error is handled by React Query hook.
 */
export async function getArticles(filter: (typeof FILTERS)[number]) {
  const url = new URL(
    `https://api.nytimes.com/svc/mostpopular/v2/${filter}/7.json`,
  )
  url.searchParams.set("api-key", process.env.API_KEY as string)
  const res = await fetch(url, {
    next: {
      revalidate: 3600,
    },
  })
  if (!res.ok) {
    throw new Error("Failed to fetch articles")
  }

  if (FETCH_DELAY) {
    await new Promise((resolve) => setTimeout(resolve, +FETCH_DELAY))
  }

  const json: Response = await res.json()
  return json.results
}
