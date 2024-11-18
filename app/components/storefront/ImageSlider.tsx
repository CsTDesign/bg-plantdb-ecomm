"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import Image from "next/image"
import { useState } from "react"

interface iAppProps {
  images: string[]
}

export function ImageSlider({ images }: iAppProps) {
  const [
    mainImageIndex,
    setMainImageIndex
  ] = useState(0)

  function handlePreviousClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }

  function handleNextClick() {
    setMainImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }

  function handleImageClick(index: number) {
    setMainImageIndex(index)
  }

  return (
    <div className="gap-6 grid items-start md:gap-3">
      <div className="overflow-hidden relative rounded-lg">
        <Image
          alt="Product image"
          className="h-[600px] object-cover w-[600px]"
          height={600}
          src={images[mainImageIndex]}
          width={600}
        />

        <div className="absolute flex inset-0 items-center justify-between px-4">
          <Button
            onClick={handlePreviousClick}
            size="icon"
            variant="outline"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            onClick={handleNextClick}
            size="icon"
            variant="outline"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="gap-4 grid grid-cols-5">
        {
          images.map((image, index) => (
            <div
              className={cn(
                index === mainImageIndex
                  ? "border-2 border-primary"
                  : "border border-gray-200",
                "cursor-pointer overflow-hidden relative rounded-lg"
              )}
              key={index}
              onClick={() => handleImageClick(index)}
            >
              <Image
                alt="Product image"
                className="h-[100px] object-cover w-[100px]"
                height={100}
                src={image}
                width={100}
              />
            </div>
          ))
        }
      </div>
    </div>
  )
}
