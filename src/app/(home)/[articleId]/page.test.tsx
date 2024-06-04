import { render, screen, userEvent } from "@/mocks/test-utils"
import ArticlePage from "./page"

const PROPS = {
  params: { articleId: "33ec971a-5363-54b9-b500-3e6a33d9acfa" },
  searchParams: { type: "" },
}

describe("Article Detail page", () => {
  it("should have title and cover image", async () => {
    // Arange
    render(await ArticlePage(PROPS))

    // Act & Assert
    const title = screen.getByRole("heading", { level: 2, name: /Holy Cow/ })
    expect(title).toBeInTheDocument()
    const cover = screen.getByRole("img", { name: /Cover/ })
    expect(cover).toBeInTheDocument()
  })

  it("should allow user to purchase the article", async () => {
    // Arange
    render(await ArticlePage(PROPS))
    const buyButton = screen.getByRole("button", { name: /Buy Article/ })
    expect(buyButton).toBeInTheDocument()

    // Act
    await userEvent.click(buyButton)
    const confirmButton = screen.getByRole("button", { name: /Confirm/ })
    await userEvent.click(confirmButton)

    // Assert
    const status = screen.getByText(/You have purchased this article/)
    expect(status).toBeInTheDocument()
    expect(buyButton).not.toBeInTheDocument()
  })
})
