"use client"

import { createProduct } from "@/app/actions"
import { UploadDropzone } from "@/app/lib/uploadthing"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  XIcon
} from "lucide-react"
import Link from "next/link"
import { useFormState } from "react-dom"
import { useForm } from "@conform-to/react"
import { parseWithZod } from "@conform-to/zod"
import { productSchema } from "@/app/lib/zodSchemas"
import { useState } from "react"
import Image from "next/image"
import { categories } from "@/app/lib/categories"
import { SubmitButton } from "@/app/components/SubmitButtons"

export default function ProductCreateRoute() {
  const [
    images,
    setImages
  ] = useState<string[]>([])
  
  const [
    lastResult,
    action
  ] = useFormState(createProduct, undefined)

  const [
    form,
    fields
  ] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: productSchema
      })
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput"
  })

  const handleDelete = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }
  
  return (
    <form
      action={action}
      id={form.id}
      onSubmit={form.onSubmit}
    >
      <div className="flex gap-4 items-center">
        <Button
          asChild
          size="icon"
          variant="outline"
        >
          <Link href="/dashboard/products">
            <ChevronLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="font-semibold text-xl tracking-tight">
          New Product
        </h1>
      </div>

      <Card className="mt-5">
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
          <CardDescription>Create your product here</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Label>Name</Label>
              <Input
                className="w-full"
                defaultValue={fields.name.initialValue}
                key={fields.name.key}
                name={fields.name.name}
                placeholder="Product name"
                type="text"
              />
              <p className="text-red-500">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Description</Label>
              <Textarea
                defaultValue={fields.description.initialValue}
                key={fields.description.key}
                name={fields.description.name}
                placeholder="Describe product here..."
              />
              <p className="text-red-500">{fields.description.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Price</Label>
              <Input
                defaultValue={fields.price.initialValue}
                key={fields.price.key}
                name={fields.price.name}
                placeholder="Price in $"
                type="number"
              />
              <p className="text-red-500">{fields.price.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Featured Product</Label>
              <Switch
                defaultValue={fields.isFeatured.initialValue}
                key={fields.isFeatured.key}
                name={fields.isFeatured.name}
              />
            </div>

            <div className="flex flex-col gap-3">
              <Label>Status</Label>
              <Select
                defaultValue={fields.status.initialValue}
                key={fields.status.key}
                name={fields.status.name}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.status.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Category</Label>
              <Select
                defaultValue={fields.category.initialValue}
                key={fields.category.key}
                name={fields.category.name}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {
                    categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.name}
                      >
                        {category.title}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <p className="text-red-500">{fields.category.errors}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Label>Images</Label>
              <input
                defaultValue={fields.images.initialValue as any}
                key={fields.images.key}
                name={fields.images.name}
                type="hidden"
                value={images}
              />
              {
                images.length > 0 ? (
                  <div className="flex gap-5">
                    {
                      images.map((image, index) => (
                        <div
                          className="h-[100px] relative w-[100px]"
                          key={index}
                        >
                          <Image
                            alt="Product image"
                            className="border h-full object-cover rounded-lg w-full"
                            height={100}
                            src={image}
                            width={100}
                          />
                          <button
                            className="absolute bg-red-500 p-2 -right-3 rounded-lg text-white -top-3"
                            onClick={() => handleDelete(index)}
                            type="button"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      setImages(res.map((r) => r.url))
                    }}
                    onUploadError={() => {
                      alert("Something went wrong. Please try again later.")
                    }}
                  />
                )
              }
              <p className="text-red-500">{fields.images.errors}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Create Product" />
        </CardFooter>
      </Card>
    </form>
  )
}
