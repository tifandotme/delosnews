"use client"

import { queryClient } from "@/lib/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        disableTransitionOnChange
        enableSystem={false}
        attribute="class"
      >
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}
