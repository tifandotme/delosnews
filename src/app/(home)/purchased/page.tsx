import { Articles } from "@/app/(home)/purchased/articles"

export default function Purchased() {
  return (
    <div className="container-main min-h-[calc(100vh-var(--masthead-height))] pt-16 max-masthead:mt-14">
      <Articles />
    </div>
  )
}
