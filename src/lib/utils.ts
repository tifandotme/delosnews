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

export function constructArticleHref(uri: string, type: string) {
  const articleId = uri.slice(uri.lastIndexOf("/") + 1)
  const queryParams =
    type.toLowerCase() === "interactive" ? "?type=interactive" : ""
  return `/${articleId}${queryParams}`
}
