import { QueryCache } from "@tanstack/react-query"

import { server } from "./server"

import "@testing-library/jest-dom"

const queryCache = new QueryCache()

const noop = () => {}
Object.defineProperty(window, "scrollTo", { value: noop, writable: true })

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterAll(() => server.close())
afterEach(() => {
  server.resetHandlers()
  queryCache.clear()
})
