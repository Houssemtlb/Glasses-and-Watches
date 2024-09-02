import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { getDiapoImages } from "@/lib/diaporama"
import { getImages } from "@/lib/products"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"
import { LandingCarousel, LandingCarouselSkelton } from "./_components/LandingCarousel"

async function getMostPopularWatches(){
    return db.product.findMany({
      where: { isAvailableForPurchase: true, type: "Montre" },
      orderBy: { orders: { _count: "desc" } },
      take: 4,
    })
  }

async function getNewestWatches(){
  return db.product.findMany({
    where: { isAvailableForPurchase: true, type: "Montre" },
    orderBy: { createdAt: "desc" },
    take: 4,
  })
}

async function getMostPopularGlasses(){
    return db.product.findMany({
      where: { isAvailableForPurchase: true, type: "Lunettes" },
      orderBy: { orders: { _count: "desc" } },
      take: 4,
    })
  }


async function getNewestGlasses(){
  return db.product.findMany({
    where: { isAvailableForPurchase: true, type: "Lunettes" },
    orderBy: { createdAt: "desc" },
    take: 4,
  })
}

async function getNewstAccessories(){
  return db.product.findMany({
    where: { isAvailableForPurchase: true, type: "Accessoire" },
    orderBy: { createdAt: "desc" },
    take: 4,
  })
}

async function getMostPopularAccessories(){
  return db.product.findMany({
    where: { isAvailableForPurchase: true, type: "Accessoire" },
    orderBy: { orders: { _count: "desc" } },
    take: 4,
  })
}

export default function HomePage() {
  return (
    <main>
      <HeroSection/>
      <div className="container space-y-12 my-12 pb-10">
        <ProductGridSection
          title="Lunettes Populaires"
          productsFetcher={getMostPopularGlasses}
          direction="glasses"
        />
        <ProductGridSection title="Nouvelles Lunettes" productsFetcher={getNewestGlasses} direction="glasses"/>
        <ProductGridSection
          title="Montres Populaires"
          productsFetcher={getMostPopularWatches}
          direction="watches"
        />
        <ProductGridSection title="Nouvelles Montres" productsFetcher={getNewestWatches} direction="watches"/>
        <ProductGridSection
          title="Accessoires Populaires"
          productsFetcher={getMostPopularAccessories}
          direction="accessories"
        />
        <ProductGridSection title="Nouveaux Accessoires" productsFetcher={getNewstAccessories} direction="accessories"/>
      </div>
    </main>
  )
}

function HeroSection(){
  return(
    <div>
      <Suspense fallback={
        <>
          <LandingCarouselSkelton/>
        </>
      }>
        <LandingCarouselSuspense/>
      </Suspense>
    </div>  
  )
}

type ProductGridSectionProps = {
  title: string
  productsFetcher: () => Promise<Product[]>
  direction : string
}

function ProductGridSection({
  productsFetcher,
  title,
  direction
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold text-primary">{title}</h2>
        <Button variant="outline" className="text-primary" asChild>
          <Link href={`/${direction}`} className="space-x-2">
            <span>Voir Tout</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-hidden">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  )
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>
}) {
  const products = await productsFetcher()
  const images = await getImages()

  return products.map(product => (
    <ProductCard
      key={product.id}
      name={product.name}
      brand={product.brand}
      price={product.price}
      description={product.description}
      images={images ? images.filter(image => image.productId === product.id) : []}
      id={product.id}
      type={product.type}
      category={product.category}
    />
  ))
}



async function LandingCarouselSuspense(){
  const carouselImages = await getDiapoImages()
  
  return(
    <>
      <LandingCarousel images={carouselImages}/>
    </>
  )
}