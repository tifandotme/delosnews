import { Inter, Rasa } from "next/font/google"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

const fontSerif = Rasa({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const fonts = [fontSans, fontSerif]
