import { QueryCache } from "@tanstack/react-query"

import { server } from "./server"

import "@testing-library/jest-dom"

const queryCache = new QueryCache()

Object.defineProperty(window, "matchMedia", {
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
  writable: true,
})

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
  queryCache.clear()
})
