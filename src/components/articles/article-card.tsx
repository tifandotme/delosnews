import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function ArticleCard({
  children,
  className,
  ...props
}: React.HTMLProps<HTMLLIElement>) {
  return (
    <article
      className={cn(
        "max-sm flex justify-between gap-2 border-b bg-card pb-6 text-card-foreground max-sm:flex-col max-sm:group-last:border-b-0 sm:h-[300px] sm:border sm:p-6 sm:shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </article>
  )
}

export function ArticleSkeleton() {
  return (
    <ArticleCard className="!border-0 !shadow-none">
      <div className="flex w-full flex-col">
        <Skeleton className="h-5 w-[10ch]" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="mt-1 h-5 w-full" />
        <Skeleton className="mt-1 h-5 w-[70%]" />
      </div>
      <Skeleton className="aspect-square h-full w-auto shrink-0 object-cover lg:aspect-[16/10]" />
    </ArticleCard>
  )
}
