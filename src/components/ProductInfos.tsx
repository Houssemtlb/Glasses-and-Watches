"use client"

import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { getImages, getImagesByProductId, getProductById } from "@/lib/products"
import { useState } from "react"
import { Dialog } from "@radix-ui/react-dialog"
import { PurchaseForm } from "./PurchaseForm"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"

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

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

  return (
    <div className="grid md:grid-cols-2 gap-6 lg:gap-48 items-start max-w-6xl px-4 mx-auto py-6">
      <div className="grid gap-4 md:gap-8">
        <Carousel className="w-full">
          <CarouselContent>
          {images.map(image => (
            <CarouselItem key={image.id}>
              <img
                src={image.path}
                alt="Product Image"
                width={500}
                height={400}
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
          <h1 className="text-3xl font-bold">{name}</h1>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{price}</span>
            <Badge variant="outline">In Stock</Badge>
          </div>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Type:</span>
            <span className="text-muted-foreground">{type}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Brand:</span>
            <span className="text-muted-foreground">{brand}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Category:</span>
            <span className="text-muted-foreground">{category}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-medium">Color:</span>
            <span className="text-muted-foreground">{color}</span>
          </div>
          {dimensions && 
            <div className="flex items-center gap-2">
              <span className="text-base font-medium">Dimensions:</span>
              <span className="text-muted-foreground">{dimensions}</span>
            </div>}
        </div>
        <div className="flex gap-2 w-full justify-center md:justify-start">
        <Dialog>
            <DialogTrigger asChild><Button size="lg" >Order Now</Button></DialogTrigger>
            <DialogContent className="w-10/12 h-5/6 sm:max-w-md rounded-md overflow-y-scroll" onOpenAutoFocus={e=>e.preventDefault()}>
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