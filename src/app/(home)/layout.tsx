import { MobileMenu } from "@/app/(home)/mobile-menu"
import { ThemeSwitcher } from "@/app/(home)/theme-switcher"
import { buttonVariants } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Origami } from "lucide-react"
import Link from "next/link"

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="fixed inset-x-0 top-0 flex h-[var(--header-height)] items-center justify-between bg-background/50 px-6 backdrop-blur-md">
        <Link href="/">
          <h1 className="inline-flex h-10 items-center gap-1 font-serif text-2xl font-semibold hover:text-foreground/80">
            <Origami size={19} strokeWidth={2.2} aria-hidden="true" />
            <span className="translate-y-0.5 tracking-tight">Delosnews</span>
          </h1>
        </Link>
        <ul className="flex gap-2 max-sm:hidden">
          {NAV_LINKS.map(({ href, label }) => (
            <li
              className="inline-flex h-10 items-center font-medium"
              key={href}
            >
              <Link
                className={cn(
                  buttonVariants({
                    variant: "link",
                    className: "px-1",
                  }),
                )}
                href={href}
              >
                {label}
              </Link>
            </li>
          ))}
          <ThemeSwitcher />
        </ul>
        <MobileMenu />
      </header>
      {children}
    </>
  )
}
