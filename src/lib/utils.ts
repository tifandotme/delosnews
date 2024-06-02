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
