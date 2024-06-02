"use client"

import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function ThemeSwitcher(props: React.HTMLAttributes<HTMLButtonElement>) {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Button variant="unstyled" size="icon" {...props}>
      {theme === "dark" && mounted ?
        <Sun onClick={() => setTheme("light")} />
      : <Moon onClick={() => setTheme("dark")} />}
    </Button>
  )
}
