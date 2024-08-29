"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import Image from "next/image"
import { Dialog } from "@radix-ui/react-dialog"
import { PurchaseForm } from "./PurchaseForm"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { formatCurrency } from "@/lib/formatters"

type ProductCardProps = {
    id: string
    name: string
    price: number
    description: string
    type: string
    brand: string
    category: string
    color: string
    dimensions: string | null
    images: { id: string; path: string }[]
  }

export default function ProductInfos({
    id,
    name,
    price,
    description,
    type,
    brand,
    color,
    dimensions,
    category,
    images,
  }: ProductCardProps) {


  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-72 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-8">
        <Carousel className="w-full">
          <CarouselContent>
          {images.map(image => (
            <CarouselItem key={image.id}>
              <Image
                src={image.path}
                alt="Product Image"
                height={500}
                width={400}
                className="aspect-[4/3] object-cover rounded-lg"
                style={{ aspectRatio: "500/400", objectFit: "contain" }}
              />
            </CarouselItem>
          ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="grid gap-4 md:gap-8">
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold text-primary">{name}</h1>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary">{formatCurrency(price)}</span>
            <Badge variant="outline" className="text-primary">In Stock</Badge>
          </div>
          <p className="text-muted-text-base">
            {description}
          </p>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium ">Type:</span>
            <span className="text-muted-text-base">{type}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium">Brand:</span>
            <span className="text-muted-text-base">{brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium">Category:</span>
            <span className="text-muted-text-base">{category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-medium">Color:</span>
            <span className="text-muted-text-base">{color}</span>
          </div>
          {dimensions && 
            <div className="flex items-center gap-2">
              <span className="text-primary font-medium">Dimensions:</span>
              <span className="text-muted-text-base">{dimensions}</span>
            </div>}
        </div>
        <div className="flex gap-2 w-full justify-center md:justify-start">
        <Dialog>
            <DialogTrigger asChild><Button size="lg" >Order Now</Button></DialogTrigger>
            <DialogContent className="w-10/12 h-5/6 sm:h-auto sm:max-w-md rounded-md overflow-y-scroll sm:overflow-y-clip" onOpenAutoFocus={e=>e.preventDefault()}>
                <DialogHeader>
                    <DialogDescription >
                        <PurchaseForm id={id} price={price}/>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </div>
      </div>
    </div>
  )
}