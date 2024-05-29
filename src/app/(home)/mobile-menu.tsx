"use client"

import { ThemeSwitcher } from "@/app/(home)/theme-switcher"
import { Button, buttonVariants } from "@/components/ui/button"
import { NAV_LINKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import * as Dialog from "@radix-ui/react-dialog"
import { Menu, X } from "lucide-react"
import Link from "next/link"

export function MobileMenu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="sm:hidden" variant="unstyled" size="icon">
          <Menu strokeWidth={2.5} size={22} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className="fixed inset-0 h-screen overflow-y-auto bg-background p-6 focus:outline-none">
          <nav className="relative size-full">
            <ul className="flex flex-col items-start justify-start pt-1 font-serif font-medium">
              {NAV_LINKS.map(({ href, label }) => (
                <li className="my-3 inline-flex h-10 items-center" key={href}>
                  <Link
                    className={cn(
                      buttonVariants({
                        variant: "link",
                        className: "whitespace-nowrap text-4xl leading-relaxed",
                      }),
                    )}
                    href={href}
                  >
                    {label}
                  </Link>
                </li>
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
