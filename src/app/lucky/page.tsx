"use client"

import { SparklesText } from "@/components/animated/sparkles-text"
import { FormatCoins, FormatTickets } from "@/components/currencies"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/stores"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

const PRIZES: { type: string; amount?: number }[] = [
  { type: "coins", amount: 50000 },
  { type: "coins", amount: 20000 },
  { type: "tickets", amount: 1 },
  { type: "try-again" },
  { type: "try-again" },
]

function drawCoin(haveWonFifty: boolean) {
  const filteredPrizes =
    haveWonFifty ?
      PRIZES.filter((p) => p.type !== "coins" || p.amount !== 50000)
    : PRIZES

  const randomIndex = Math.floor(Math.random() * filteredPrizes.length)
  return filteredPrizes[randomIndex]!
}

export default function LuckyCoin() {
  const { coins, updateCoins, tickets, updateTickets } = useStore(
    (state) => state,
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [drawRemaining, setDrawRemaining] = useState(3)
  const [haveWonFifty, setHaveWonFifty] = useState(false)
  const [currPrize, setCurrPrize] = useState<null | (typeof PRIZES)[number]>(
    null,
  )

  const handleDraw = () => {
    if (drawRemaining === 1) {
      setIsPlaying(false)
    }

    // Determine prize
    const prize = drawCoin(haveWonFifty)
    setCurrPrize(prize)

    // Update player's balance
    if (prize.type === "coins") {
      updateCoins(prize.amount ?? 0)
      if (prize.amount === 50000) {
        setHaveWonFifty(true)
      }
    }
    if (prize.type === "tickets") {
      updateTickets(prize.amount ?? 0)
    }

    setDrawRemaining((prev) => prev - 1)
  }

  const handleStart = () => {
    // Deduct tickets
    updateTickets(-3)

    // Reset state
    setIsPlaying(true)
    setDrawRemaining(3)
    setHaveWonFifty(false)
    setCurrPrize(null)
  }

  return (
    <div className="relative bg-yellow-100/10">
      <main className="mx-auto flex max-w-screen-md flex-col items-center py-16">
        <Link
          href="/"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "sm",
              className: "h-7 rounded-full border-[3px] text-foreground/80",
            }),
          )}
        >
          <ArrowLeft size="1em" className="mr-1" />
          Back
        </Link>
        <div className="mt-14 flex justify-center gap-5">
          <FormatCoins amount={coins} className="text-lg" />
          <FormatTickets amount={tickets} className="text-lg" />
        </div>
        <SparklesText
          text="Lucky Coin"
          className="cursor-default text-center drop-shadow-lg"
        />
        <p className="mt-2 font-medium text-muted-foreground">
          Draw a lucky coin to earn rewards!
        </p>
        <Card
          className={cn(
            "z-10 mt-8 flex h-[300px] w-full max-w-[400px] flex-col items-center justify-between rounded-3xl border-[5px] bg-gradient-to-b from-yellow-50/20 to-yellow-100/30 p-5 shadow-2xl shadow-yellow-900/10",
            isPlaying ? "border-yellow-400/50" : "border-neutral-300/40",
          )}
        >
          <div className="flex h-full flex-col items-center justify-center gap-4">
            {currPrize ?
              <>
                {currPrize.amount && <span>Congratulations! You won:</span>}
                {currPrize.type === "coins" ?
                  <FormatCoins
                    amount={currPrize.amount!}
                    className="text-5xl font-bold"
                  />
                : currPrize?.type === "tickets" ?
                  <FormatTickets
                    amount={currPrize.amount!}
                    className="text-5xl font-bold"
                  />
                : <span>Try again 😔</span>}
              </>
            : <span>Draw your first coin!</span>}
          </div>

          <div className="flex h-[70px] shrink-0 flex-col items-center justify-start gap-1">
            {isPlaying ?
              <Button
                className="w-fit rounded-full bg-yellow-700 hover:bg-yellow-700/80"
                size="lg"
                onClick={handleDraw}
              >
                Draw
              </Button>
            : <Button
                className="w-fit rounded-full border-[3px]"
                size="lg"
                variant="outline"
                disabled={tickets < 3}
                onClick={handleStart}
              >
                Start
              </Button>
            }
            {isPlaying ?
              <span className="whitespace-nowrap text-sm text-muted-foreground">
                Draw remaining: {drawRemaining}
              </span>
            : <FormatTickets amount={3} className="text-sm" />}
          </div>
        </Card>
      </main>

      <RetroGrid />
    </div>
  )
}

function RetroGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 size-full min-h-screen overflow-hidden opacity-50 [perspective:200px]">
      {/* Grid */}
      <div className="absolute inset-0 [transform:rotateX(35deg)]">
        <div
          className={cn(
            "animate-grid",

            "[background-repeat:repeat] [background-size:60px_60px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]",

            // Light Styles
            "[background-image:linear-gradient(to_right,rgba(0,0,0,0.3)_1px,transparent_0),linear-gradient(to_bottom,rgba(0,0,0,0.3)_1px,transparent_0)]",

            // Dark styles
            "dark:[background-image:linear-gradient(to_right,rgba(255,255,255,0.2)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)]",
          )}
        />
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent to-90% dark:from-black" />
    </div>
  )
}
