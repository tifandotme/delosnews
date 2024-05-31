"use server"

import type { FILTERS } from "@/lib/constants"
import type { MostPopular } from "@/types"

// const BASE_URL = "https://api.nytimes.com/svc/mostpopular/v2/"
const BASE_URL = "http://localhost:3100/"
const FETCH_DELAY = process.env.FETCH_DELAY as string
// const API_KEY = process.env.NYT_API_KEY as string

/**
 * Server action to fetch articles from the NYT API. Error is handled by React Query hook.
 */
export async function getArticles(basedOn: (typeof FILTERS)[number]) {
  // const res = await fetch(`${BASE_URL}${basedOn}/1.json?api-key=${API_KEY}`, {
  const res = await fetch(BASE_URL + basedOn, {
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

  const json: MostPopular = await res.json()
  return json.results
}
