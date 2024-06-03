import {
  AppRouterContext,
  type AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render, type RenderOptions } from "@testing-library/react"

import { Toaster } from "@/components/ui/sonner"

/**
 * Wraps the component in providers that are required for the tests.
 */
function customRender(ui: React.ReactElement, options?: RenderOptions) {
  const mockedRouter: AppRouterInstance = {
    back: vi.fn(),
    forward: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(ui, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        <AppRouterContext.Provider value={mockedRouter}>
          {children}
          <Toaster />
        </AppRouterContext.Provider>
      </QueryClientProvider>
    ),
    ...options,
  })
}

export * from "@testing-library/react"
export { default as userEvent } from "@testing-library/user-event"
export { customRender as render }
