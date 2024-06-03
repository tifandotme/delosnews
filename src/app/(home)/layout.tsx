import { ShinyText } from "@/components/animated/shiny-text"
import { StickyHeader } from "@/app/(home)/sticky-header"
import { ThemeSwitcher } from "@/app/(home)/theme-switcher"
import { buttonVariants } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { Origami } from "lucide-react"
import Link from "next/link"

export default function HomeLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <header className="h-[var(--masthead-height)] bg-muted dark:bg-muted/20 max-masthead:hidden">
        <div className="container-main grid h-full grid-cols-3 items-center">
          <ThemeSwitcher className="justify-self-start [&>svg]:size-5" />

          <Link className="justify-self-center" href="/">
            <h1 className="inline-flex select-none items-center gap-0.5 font-serif text-5xl font-semibold leading-none tracking-tight hover:text-foreground/80">
              <span>Delos</span>
              <Origami
                className="-translate-y-1.5"
                size="0.9em"
                strokeWidth={2.1}
                aria-hidden="true"
              />
              <span className="text-red-600 dark:text-red-400">news</span>
            </h1>
          </Link>

          <div className="w-fit space-x-5 justify-self-end uppercase tracking-tight">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                className={cn(
                  buttonVariants({
                    variant: "link",
                    className: "px-0",
                  }),
                )}
                href={href}
              >
                {href === "/lucky" ?
                  <ShinyText>{label}</ShinyText>
                : label}
              </Link>
            ))}
          </div>
        </div>
      </header>

      <StickyHeader />

      {children}

      <footer className="mt-6 bg-muted dark:bg-muted/20">
        <div className="container-main flex justify-center py-10">
          <Origami size="1.5rem" strokeWidth={2.1} aria-label="Delosnews" />
        </div>
      </footer>
    </>
  )
}
