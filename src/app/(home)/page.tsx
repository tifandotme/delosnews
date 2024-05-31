import { Articles } from "@/app/(home)/articles"

export default function Home() {
  return (
    <main className="container mt-[var(--header-height)] pt-5">
      <h2 className="mb-10 text-center font-serif text-4xl">Explore</h2>
      <Articles />
    </main>
  )
}
