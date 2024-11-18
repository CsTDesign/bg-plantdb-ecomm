"use client"

import { createBanner } from "@/app/actions"
import { SubmitButton } from "@/app/components/SubmitButtons"
import { UploadDropzone } from "@/app/lib/uploadthing"
import { bannerSchema } from "@/app/lib/zodSchemas"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useFormState } from "react-dom"

export default function BannerCreateRoute() {
  const [
    image,
    setImage
  ] = useState<string | undefined>(undefined)

  const [
    lastResult,
    action
  ] = useFormState(createBanner, undefined)

  const [
    form,
    fields
  ] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: bannerSchema
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })
  
  return (
    <form
      action={action}
      id={form.id}
      onSubmit={form.onSubmit}
    >
      <div className="flex gap-x-4 items-center">
        <Button
          asChild
          size="icon"
          variant="outline"
        >
          <Link href="/dashboard/banner">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="font-semibold text-xl tracking-tight">New Banner</h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Banner Details</CardTitle>
          <CardDescription>Add banners in rotation to homepage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-y-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                defaultValue={fields.title.initialValue}
                key={fields.title.key}
                name={fields.title.name}
                placeholder="Banner title"
                type="text"
              />
              <p className="text-red-500">{fields.title.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Image</Label>
              <input
                defaultValue={fields.imageString.initialValue}
                key={fields.imageString.key}
                name={fields.imageString.name}
                type="hidden"
                value={image}
              />
              {
                image !== undefined ? (
                  <Image
                    alt="Banner image"
                    className="border h-[200px] object-cover rounded-lg w-[200px]"
                    height={200}
                    src={image}
                    width={200}
                  />
                ) : (
                  <UploadDropzone
                    endpoint="bannerImageRoute"
                    onClientUploadComplete={(res) => {
                      setImage(res[0].url)
                    }}
                    onUploadError={() => {
                      alert("An error occurred. Please try again later.")
                    }}
                  />
                )
              }
              <p className="text-red-500">{fields.imageString.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Banner" />
        </CardFooter>
      </Card>
    </form>
  )
}
