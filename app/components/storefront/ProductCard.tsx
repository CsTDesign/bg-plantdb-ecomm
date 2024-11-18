import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import Link from "next/link"

interface iAppProps {
  item: {
    id: string
    name: string
    description: string
    price: number
    images: string[]
  }
}

export function ProductCard({ item }: iAppProps) {
  return (
    <div className="rounded-lg">
      <Carousel className="mx-auto w-full">
        <CarouselContent>
          {
            item.images.map((item, index) => (
              <CarouselItem key={index}>
                <div className="h-[330px] relative">
                  <Image
                    alt="Product image"
                    className="h-full object-center object-cover rounded-lg w-full"
                    fill
                    src={item}
                  />
                </div>
              </CarouselItem>
            ))
          }
        </CarouselContent>
        <CarouselPrevious className="ml-16" />
        <CarouselNext className="mr-16" />
      </Carousel>

      <div className="flex items-center justify-between mt-2">
        <h1 className="font-semibold text-xl">{item.name}</h1>
        <h3 className="bg-primary/10 font-medium inline-flex items-center px-2 py-1 ring-1 ring-inset ring-primary/10 rounded-md text-primary text-xs">${item.price}</h3>
      </div>
      <p className="line-clamp-2 mt-2 text-gray-600 text-sm whitespace-pre-wrap">{item.description}</p>

      <Button
        asChild
        className="mt-5 w-full"
      >
        <Link href={`/product/${item.id}`}>Learn More!</Link>
      </Button>
    </div>
  )
}

export function LoadingProductCard() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-[330px] w-full" />
      <div className="flex flex-col gap-y-2 mt-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
      <Skeleton className="h-10 mt-5 w-full" />
    </div>
  )
}
