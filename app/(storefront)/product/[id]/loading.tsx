import { Skeleton } from "@/components/ui/skeleton"

export default function ProductLoadingRoute() {
  return (
    <div className="gap-6 grid items-start lg:gap-x-24 md:grid-cols-2 py-6">
      <div>
        <Skeleton className="h-[600px] w-full" />
        <div className="gap-4 grid grid-cols-5 mt-6">
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
          <Skeleton className="h-[100px] w-[100px]" />
        </div>
      </div>

      <div>
        <Skeleton className="h-12 w-56" />
        <Skeleton className="h-12 mt-4 w-36" />
        <Skeleton className="h-60 mt-4 w-full" />
        <Skeleton className="h-12 mt-5 w-full" />
      </div>
    </div>
  )
}
