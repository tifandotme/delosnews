import { twMerge } from "tailwind-merge"

export function cn(...args: unknown[]): string | undefined {
  return twMerge(
    args
      .flat()
      .filter((x) => typeof x === "string")
      .join(" ")
      .trim() || undefined,
  )
}
