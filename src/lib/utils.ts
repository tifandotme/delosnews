import { twMerge } from "tailwind-merge"

/**
 * Merge tailwind classes and allow for conditional classes
 */
export function cn(...args: unknown[]): string | undefined {
  return twMerge(
    args
      .flat()
      .filter((x) => typeof x === "string")
      .join(" ")
      .trim() || undefined,
  )
}

/**
 * @example toSentenceCase("helloWorld") // "Hello World"
 */
export function toSentenceCase(str: string) {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
}

export function formatRelativeDate(date: string) {
  const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "auto",
  })

  const DIVISIONS = [
    { amount: 60, name: "seconds" },
    { amount: 60, name: "minutes" },
    { amount: 24, name: "hours" },
    { amount: 7, name: "days" },
    { amount: 4.34524, name: "weeks" },
    { amount: 12, name: "months" },
    { amount: Number.POSITIVE_INFINITY, name: "years" },
  ]

  let duration = (new Date(date).getTime() - new Date().getTime()) / 1000
  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i] as { amount: number; name: string }
    if (Math.abs(duration) < division.amount) {
      return formatter.format(
        Math.round(duration),
        division.name as Intl.RelativeTimeFormatUnit,
      )
    }

    duration /= division.amount
  }

  return "a long time ago"
}

/**
 * NYT's article URI format looks like `nyt://{type}/{articleId}`.
 * `type` can be "article" or "interactive".
 *
 * In order to turn this information into a pathname that this application can read,
 * we need to extract the `articleId` and add a query param if the type is "interactive".
 *
 * The final href will look like `/{articleId}?type=interactive`.
 */
export function constructArticleHref(uri: string) {
  const data = uri.split("/")
  const type = data[data.length - 2]
  const articleId = data[data.length - 1]
  const queryParams =
    type!.toLowerCase() === "interactive" ? "?type=interactive" : ""
  return `/${articleId}${queryParams}`
}
