"use client"

import { NProgressProvider } from "@/app/nprogress"
import { Toaster } from "@/components/ui/sonner"
import { getQueryClient } from "@/lib/react-query"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { ThemeProvider } from "next-themes"
import { usePathname } from "next/navigation"

export function Providers({ children }: React.PropsWithChildren) {
  const pathname = usePathname()
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        forcedTheme={pathname === "/lucky" ? "light" : undefined}
        disableTransitionOnChange
        enableSystem={false}
        attribute="class"
      >
        <NProgressProvider>{children}</NProgressProvider>
        <Toaster />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
