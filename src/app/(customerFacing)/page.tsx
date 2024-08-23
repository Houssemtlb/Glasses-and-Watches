import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Button } from "@/components/ui/button"
import db from "@/db/db"
import { cache } from "@/lib/cache"
import { getImages } from "@/lib/products"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const getMostPopularWatches = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true, type: "Montre" },
      orderBy: { orders: { _count: "desc" } },
      take: 4,
    })
  },
  ["/", "getMostPopularWatches"],
  { revalidate: 60 * 60 * 24 }
)

const getNewestWatches = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true, type: "Montre" },
    orderBy: { createdAt: "desc" },
    take: 4,
  })
}, ["/", "getNewestWatches"])

const getMostPopularGlasses = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true, type: "Lunettes" },
      orderBy: { orders: { _count: "desc" } },
      take: 4,
    })
  },
  ["/", "getMostPopularGlasses"],
  { revalidate: 60 * 60 * 24 }
)

const getNewestGlasses = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true, type: "Lunettes" },
    orderBy: { createdAt: "desc" },
    take: 4,
  })
}, ["/", "getNewestGlassess"])

export default function HomePage() {
  return (
    <main className="space-y-12">
      <ProductGridSection
        title="Most Popular Glasses"
        productsFetcher={getMostPopularGlasses}
        direction="glasses"
      />
      <ProductGridSection title="Newest Glasses" productsFetcher={getNewestGlasses} direction="glasses"/>
      <ProductGridSection
        title="Most Popular Watches"
        productsFetcher={getMostPopularWatches}
        direction="watches"
      />
      <ProductGridSection title="Newest Watches" productsFetcher={getNewestWatches} direction="watches"/>
    </main>
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
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" asChild>
          <Link href={`/${direction}`} className="space-x-2">
            <span>View All</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
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