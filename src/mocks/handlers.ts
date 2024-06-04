import { http, HttpResponse } from "msw"
import fs from "node:fs/promises"
import path from "node:path"

export const handlers = [
  http.get(
    `https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json`,
    async () => {
      const json = await fs.readFile(
        path.join(process.cwd(), "src/mocks/articles.json"),
        "utf8",
      )
      return HttpResponse.json(JSON.parse(json), { status: 200 })
    },
  ),
]
