"use client"

import { formatCurrency } from "@/lib/formatters"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import Image from "next/image"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel"
import React, { useEffect } from 'react';


type ProductCardProps = {
  id: string
  name: string
  price: number
  description: string
  type: string
  brand: string
  category: string
  images: { id: string; path: string }[]
}


export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden flex flex-col animate-pulse">
      <div className="w-full aspect-video bg-gray-300" />
      <CardHeader>
        <CardTitle>
          <div className="w-3/4 h-6 rounded-full bg-gray-300" />
        </CardTitle>
        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300" />
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-full h-4 rounded-full bg-gray-300" />
        <div className="w-3/4 h-4 rounded-full bg-gray-300" />
      </CardContent>
      <CardFooter>
        <Button className="w-full" disabled size="lg"></Button>
      </CardFooter>
    </Card>
  )
}


export function ProductCard({
  id,
  name,
  price,
  description,
  type,
  brand,
  category,
  images,
}: ProductCardProps) {
  return (
    <Card className="flex flex-col w-full max-w-md min-w-56 min-h-[350px]">
      <Carousel opts={{ loop: true}} className="rounded-t-lg overflow-hidden">
        <CarouselContent>
          {images.map(image => (
            <CarouselItem key={image.id}>
              <Image
                src={image.path}
                alt="Product Image"
                width={500}
                height={400}
                className="object-cover w-full h-64 "
                style={{ aspectRatio: "500/400", objectFit: "contain" }}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground hover:bg-background/75 focus:outline-none">
          <ChevronLeftIcon className="h-5 w-5" />
        </CarouselPrevious>
        <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/50 p-2 text-primary-foreground hover:bg-background/75 focus:outline-none">
          <ChevronRightIcon className="h-5 w-5" />
        </CarouselNext>
      </Carousel>
      <CardContent className="flex flex-col flex-grow p-4 ">
        <h3 className="text-xl font-bold text-primary">{name}</h3>
        <p className="text-base flex-grow">
          {brand}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-primary">{formatCurrency(price)}</div>
          <Button size="sm">
            <Link href={type==="Lunettes" ? `/glasses/${id}` : `/watches/${id}`}>
                Buy now
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ChevronLeftIcon({className} :{className : string}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon({className} :{className : string}) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}