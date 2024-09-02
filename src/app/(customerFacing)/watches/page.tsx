"use client"

import { useState, useMemo, useEffect, Suspense } from "react"



import { ProductCardSkeleton } from "@/components/ProductCard"
import { getAvailableWatchesBrands, getWatches, getWatchesImages } from "@/lib/products"
import { FilterList, imagesType, productType } from "../_components/FilterList"


export default function WatchesPage() {
  return (
    <div className="container space-y-12 my-12 pb-10">
        <Suspense
          fallback={
            <div className="md:ml-60 sm:ml-0">
              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-4">
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
                <ProductCardSkeleton />
              </div>
            </div>
          }
        >
          <WatchesPageSuspense />
        </Suspense>
    </div>
  )
}

async function WatchesPageSuspense() {
  const [products, setProducts] = useState<productType[]>([])
  const [images, setImages] = useState<imagesType[]>([])
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      const products = await getWatches()
      const images = await getWatchesImages()
      const brands = await getAvailableWatchesBrands()
      setProducts(products)
      setImages(images)
      setBrands(brands)
    }
    fetchData()
  }, [])

  return (
        <FilterList products={products} images={images} brands={brands} direction="Montres"/>
  )
}