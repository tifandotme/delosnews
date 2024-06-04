"use client"

import { FormatCoins } from "@/components/currencies"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button, buttonVariants } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useStore } from "@/lib/stores"
import { cn } from "@/lib/utils"
import type { Definitions } from "@/types/article-search"
import { MoveUpRight } from "lucide-react"
import Link from "next/link"
import { useMemo } from "react"
import { toast } from "sonner"

function calculatePrice(publishedDate: Date) {
  const MS_IN_A_DAY = 24 * 60 * 60 * 1000
  const now = new Date()
  const timeDiff = now.getTime() - publishedDate.getTime()
  const daysDiff = timeDiff / MS_IN_A_DAY

  if (daysDiff <= 1) {
    return 50000
  } else if (daysDiff <= 7) {
    return 20000
  } else {
    return 0
  }
}

interface OwnershipCardProps {
  article: Definitions["Article"]
}

export function OwnershipCard({ article }: OwnershipCardProps) {
  const {
    coins,
    updateCoins,
    updateTickets,
    purchasedArticles,
    addPurchasedArticles,
  } = useStore((state) => state)

  const isPurchased = purchasedArticles.some(
    (purchasedArticle) => purchasedArticle._id === article._id,
  )

  const price = useMemo(
    () => calculatePrice(new Date(article.pub_date)),
    [article.pub_date],
  )

  return (
    <Card className="mb-5 flex items-center justify-between gap-2 max-sm:flex-col max-sm:items-start">
      <div className="w-full">
        {isPurchased ?
          <>You have purchased this article.</>
        : <>
            Purchase access to this article.
            <br />
            You have <FormatCoins amount={coins} /> in your account.
          </>
        }
      </div>
      <div className="flex w-fit items-center justify-center gap-2">
        {isPurchased ?
          <ReadButton externalLink={article.web_url} />
        : <BuyButton
            price={price}
            onConfirm={() => {
              if (purchasedArticles.length > 5 && price === 0) {
                toast(
                  "Free articles only available if you have less than 6 purchased articles.",
                )
                return
              }
              updateCoins(-price)
              addPurchasedArticles(article)
              if (price >= 50000) {
                toast("Congratulations! You received 3 Lucky Coins tickets")
                updateTickets(3)
              }
            }}
          />
        }
      </div>
    </Card>
  )
}

function ReadButton({ externalLink }: { externalLink: string }) {
  return (
    <Link className={cn(buttonVariants())} href={externalLink} target="_blank">
      Read
      <MoveUpRight className="ml-1" size="1.1em" />
    </Link>
  )
}

interface BuyButtonProps {
  price: number
  onConfirm: () => void
}

function BuyButton({ price, onConfirm }: BuyButtonProps) {
  const { coins } = useStore((state) => state)
  const isInsufficientCoins = coins < price
  return (
    <>
      {price === 0 ?
        <span className="text-sm font-medium uppercase text-muted-foreground">
          Free
        </span>
      : <FormatCoins amount={price} className="text-sm" />}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button disabled={isInsufficientCoins}>Buy Article</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm your purchase</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Take me back!</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
