import prisma from "@/app/lib/db"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"
import Image from "next/image"

async function getData() {
  const data = await prisma.banner.findMany({
    orderBy: {
      createdAt: "desc"
    }
  })

  return data
}

export async function Hero() {
  const data = await getData()
  
  return (
    <Carousel>
      <CarouselContent>
        {
          data.map((item) => (
            <CarouselItem key={item.id}>
              <div className="h-[60vh] lg:h-[80vh] relative">
                <Image
                  alt="Banner image"
                  className="h-full object-cover rounded-xl w-full"
                  fill
                  src={item.imageString}
                />
                <div className="absolute bg-black bg-opacity-75 hover:scale-105 left-6 p-6 rounded-xl shadow-lg text-white top-6 transition-transform">
                  <h1 className="font-bold lg:text-4xl text-xl">{item.title}</h1>
                  <p className="text-begin text-xs">
                    Designed by{" "}
                    <a
                      href="https://www.freepik.com"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Freepik
                    </a>
                  </p>
                </div>
              </div>
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious className="ml-16" />
      <CarouselNext className="mr-16" />
    </Carousel>
  )
}
