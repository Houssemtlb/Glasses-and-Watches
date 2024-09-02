"use client"

import { useState, useMemo, useEffect, Suspense } from "react"



import { ProductCardSkeleton } from "@/components/ProductCard"
import { getAvailableGlassesBrands, getGlasses, getGlassesImages } from "@/lib/products"
import { FilterList, imagesType, productType } from "../_components/FilterList"


export default function GlassesPage() {
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
          <GlassesPageSuspense />
        </Suspense>
    </div>
  )
}

async function GlassesPageSuspense() {
  const [products, setProducts] = useState<productType[]>([])
  const [images, setImages] = useState<imagesType[]>([])
  const [brands, setBrands] = useState<string[]>([])

  useEffect(() => {
    async function fetchData() {
      const products = await getGlasses()
      const images = await getGlassesImages()
      const brands = await getAvailableGlassesBrands()
      setProducts(products)
      setImages(images)
      setBrands(brands)
    }
    fetchData()
  }, [])

  return (
        <FilterList products={products} images={images} brands={brands} direction="Lunettes" />
  )
}

