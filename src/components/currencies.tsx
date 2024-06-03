import { cn } from "@/lib/utils"
import { Coins, Ticket } from "lucide-react"

interface FormatCoinsProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number
}

export function FormatCoins({ amount, className, ...props }: FormatCoinsProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center align-middle font-medium text-yellow-600 dark:text-yellow-400",
        className,
      )}
      {...props}
    >
      <Coins className="-my-2 mr-1" strokeWidth={2.5} size="1.1em" />
      <span className="inline">{amount.toLocaleString("id-ID")}</span>
    </span>
  )
}

interface FormatTicketsProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number
}

export function FormatTickets({
  amount,
  className,
  ...props
}: FormatTicketsProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium text-cyan-600 dark:text-cyan-400",
        className,
      )}
      {...props}
    >
      <Ticket className="-my-2 mr-1" strokeWidth={2.5} size="1.1em" />
      <span>{amount.toLocaleString("id-ID")}</span>
    </span>
  )
}
