import { Articles } from "@/app/(home)/articles"
import { render, screen, userEvent } from "@/mocks/test-utils"

// vi.mock("nuqs", async () => {
//   const nuqs = await vi.importActual("nuqs")
//   return {
//     ...nuqs,
//     // useQueryState: (key: string) => {
//     //   return [key === "search" ? "" : "emailed", vi.fn()]
//     // },
//   }
// })
vi.mock("@/hooks/use-debounce", () => ({
  useDebounce: (value: string) => value,
}))
vi.mock("@/hooks/use-intersection-observer", () => ({
  useIntersectionObserver: vi.fn(),
}))

describe("Article List (Homepage)", () => {
  it("should display exactly 5 rows of articles on page load", async () => {
    // Arange
    render(<Articles />)

    // Act
    const articleRows = await screen.findAllByTestId(/^article-\d+$/)

    // Assert
    expect(articleRows).toHaveLength(5)
  })

  it('should display 1 article titled "Holy Cow, 34 for 45!" when searched', async () => {
    // Arange
    render(<Articles />)
    const searchInput = screen.getByRole("textbox", { name: /Search/i })
    expect(searchInput).toHaveValue("")

    // Act
    await userEvent.type(searchInput, "Holy Cow")

    // Assert
    expect(searchInput).toHaveValue("Holy Cow")
    const article = await screen.findByRole("heading", {
      level: 3,
      name: /Holy Cow, 34 for 45!/,
    })
    expect(article).toBeInTheDocument()
  })
})
