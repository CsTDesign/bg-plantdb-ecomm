import { LoadingProductCard } from "@/app/components/storefront/ProductCard"
import { Skeleton } from "@/components/ui/skeleton"

export default function LoadingFile() {
  return (
    <div>
      <Skeleton className="h-10 my-5 w-56" />

      <div className="gap-5 grid lg:grid-cols-3 md:grid-cols-2">
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
        <LoadingProductCard />
      </div>
    </div>
  )
}
