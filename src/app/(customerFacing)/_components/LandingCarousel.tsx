import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"
import { imagesType } from "./FilterList"
import Link from "next/link"

type carouselType = {
    id: string;
    path : string;
    createdAt: Date;
}

export function LandingCarousel({images} : {images: carouselType[]}) {
  return (
    <Carousel className="w-full" opts={{ loop: true}}>
      <CarouselContent>
        {images.map((image,idx)=>(
            <CarouselItem>
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/6] overflow-hidden">
                <img
                    key={idx}
                    src={image.path}
                    alt="Slide"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.1)]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-8 lg:px-12 space-y-4">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Discover our collection.</h2>
                    </div>
                </div>
            </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export function LandingCarouselSkelton() {
    return (
      <Carousel className="w-full" opts={{ loop: true}}>
        <CarouselContent>
          <CarouselItem>
            <div className="relative w-full aspect-[16/6] overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full aspect-[16/6] overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="relative w-full aspect-[16/6] overflow-hidden">
              <Skeleton className="w-full h-full" />
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    )
  }