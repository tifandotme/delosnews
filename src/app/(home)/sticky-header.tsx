"use client"

import { ShinyText } from "@/components/animated/shiny-text"
import { ThemeSwitcher } from "@/app/(home)/theme-switcher"
import { Button, buttonVariants } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, Origami, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useIsomorphicLayoutEffect, useMedia, useWindowScroll } from "react-use"

export function StickyHeader() {
  const isMobile = useMedia("only screen and (max-width : 1024px)", false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { y } = useWindowScroll()

  useIsomorphicLayoutEffect(() => {
    const mastheadHeight = window
      .getComputedStyle(document.body)
      .getPropertyValue("--masthead-height")

    setIsScrolled((y ?? 0) > parseInt(mastheadHeight, 10) - 50)
  }, [y])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-10 h-[70px] items-center justify-between bg-background/80 px-4 backdrop-blur-md md:px-6",
        isScrolled || isMobile ?
          "flex animate-[fadeInDown_.2s_ease-out]"
        : "hidden",
      )}
    >
      <Link
        href="/"
        className="inline-flex h-10 items-center gap-0.5 font-serif text-2xl font-semibold tracking-tight hover:text-foreground/80"
      >
        <Origami size="1.5rem" strokeWidth={2.1} aria-label="Delosnews" />
      </Link>
      <nav className="w-fit space-x-5 uppercase tracking-tight max-sm:hidden">
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
      </nav>
      <MobileMenu />
    </header>
  )
}

function MobileMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="sm:hidden" variant="unstyled" size="icon">
          <Menu strokeWidth={2.5} size={22} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed inset-0 z-20 h-screen overflow-y-auto bg-background p-6 focus:outline-none">
          <nav className="relative size-full">
            <ul className="flex flex-col items-start justify-start pt-1 font-serif font-medium">
              {NAV_LINKS.map(({ href, label }) => (
                <Link
                  key={href}
                  className={cn(
                    buttonVariants({
                      variant: "link",
                      className:
                        "my-3 inline-flex h-10 items-center whitespace-nowrap px-0 text-4xl leading-relaxed",
                    }),
                  )}
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </ul>
            <ThemeSwitcher className="absolute bottom-4 left-3 [&>svg]:size-8" />
            <Dialog.Close asChild>
              <Button
                className="absolute -top-1 right-0 appearance-none focus:outline-none"
                variant="unstyled"
                size="icon"
                aria-label="Close"
              >
                <X />
              </Button>
            </Dialog.Close>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
