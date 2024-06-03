// import { http, HttpResponse } from "msw"

// // prettier-ignore
// export const database: Farmer[] = [

// ]

export const handlers = [
  // http.get(`${process.env.NEXT_PUBLIC_API_URL}/farmers`, ({ request }) => {
  //   const url = new URL(request.url)
  //   const limit = url.searchParams.get("limit") || "10"
  //   const offset = url.searchParams.get("offset")

  //   if (offset) {
  //     const start = Number(offset)
  //     const end = start + Number(limit)

  //     return HttpResponse.json(
  //       { farmers: database.slice(start, end) },
  //       { status: 200 },
  //     )
  //   }

  //   return HttpResponse.json(
  //     { farmers: database.slice(0, Number(limit)) },
  //     { status: 200 },
  //   )
  // }),

  // http.delete(`/api/farmers`, ({ request }) => {
  //   const url = new URL(request.url)
  //   const id = url.searchParams.get("id")

  //   if (id) {
  //     const index = database.findIndex((farmer) => farmer.id === Number(id))

  //     if (index !== -1) {
  //       database.splice(index, 1)

  //       return HttpResponse.json({ success: true }, { status: 200 })
  //     }
  //   }

  //   return HttpResponse.json({ success: false }, { status: 404 })
  // }),

  // http.post<{}, Omit<Farmer, "id">>(`/api/farmers`, async ({ request }) => {
  //   const payload = await request.json()

  //   if (
  //     database.some((farmer) => farmer.idCardNumber === payload.idCardNumber)
  //   ) {
  //     return HttpResponse.json({ success: false }, { status: 409 })
  //   }

  //   database.push({ id: database.length + 1, ...payload })

  //   return HttpResponse.json({ success: true }, { status: 201 })
  // }),
]
