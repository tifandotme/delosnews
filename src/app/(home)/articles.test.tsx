import { Articles } from "@/app/(home)/articles"
import { render, screen } from "@/mocks/test-utils"

vi.mock("nuqs", async () => {
  const nuqs = await vi.importActual("nuqs")
  return {
    ...nuqs,
    useQueryState: (key: string) => {
      return [key === "search" ? "" : "emailed", vi.fn()]
    },
  }
})
vi.mock("@/hooks/use-debounce", () => ({
  useDebounce: (value: string) => value,
}))
vi.mock("@/hooks/use-intersection-observer", () => ({
  useIntersectionObserver: vi.fn(),
}))

describe("Article List (Homepage)", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("should display exactly 5 rows of articles on page load", async () => {
    // Arange
    render(<Articles />)

    // Act
    const articleRows = await screen.findAllByTestId(/^article-\d+$/)

    // Assert
    expect(articleRows).toHaveLength(5)
  })
})
