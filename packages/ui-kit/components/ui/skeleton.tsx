/**
 * @component Skeleton
 * @version 1.0.0
 * @lastModified 2025-06-20
 * @description A placeholder component for loading states
 * @status stable
 */

import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
