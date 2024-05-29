import { fonts } from "@/lib/fonts"
import type { Metadata } from "next"
import { ThemeProvider } from "next-themes"
import "./globals.css"

export const metadata: Metadata = {
  title: "DelosNews",
  description: "Generated by create next app",
}

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fonts.map((font) => font.variable).join(" ")}>
        <ThemeProvider
          disableTransitionOnChange
          enableSystem={false}
          attribute="class"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
