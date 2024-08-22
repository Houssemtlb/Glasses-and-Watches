"use client"

import { ProductCard } from "@/components/ProductCard"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useMemo, useState } from "react"


export type productType = {
    id: string,
    name: string,
    description: string,
    type: string,
    brand: string,
    category: string,
    price: number
  }
  
  export type imagesType = {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    path: string,
    productId: string
  }
  


export function FilterList({ products, images, brands }: { products: productType[], images: imagesType[], brands : string[] }) {
    const [selectedFilters, setSelectedFilters] = useState<{ category: string[],brand : string[] }>({
      category: [],
      brand: [],
    })
  
    const handleFilterChange = (type: string, value: string) => {
      if (type === "category") {
        setSelectedFilters({
          ...selectedFilters,
          category: selectedFilters.category.includes(value)
            ? selectedFilters.category.filter((item) => item !== value)
            : [...selectedFilters.category, value],
        })
      }if (type === "brand") {
        setSelectedFilters({
          ...selectedFilters,
          brand: selectedFilters.brand.includes(value)
            ? selectedFilters.brand.filter((item) => item !== value)
            : [...selectedFilters.brand, value],
        })
      }
    }
  
    const filteredProducts = useMemo(() => {
      return products.filter((product) => {
        if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
          return false
        }
        if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) {
          return false
        }
        return true
      })
    }, [selectedFilters, products])
  
    const [isFilterOpen, setIsFilterOpen] = useState(false)
  
    return (
      <div className="grid md:grid-cols-[200px_1fr] gap-10">
        <div
          className={`fixed top-0 left-0 z-20 h-full w-full bg-background md:static md:block ${
            isFilterOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 md:translate-x-0`}
        >
          <div className="flex h-14 items-center justify-between border-b px-4 md:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <Button size="icon" variant="ghost" onClick={() => setIsFilterOpen(false)}>
              <XIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="px-4 py-6 md:px-0">
            <Accordion type="single" collapsible>
              <AccordionItem value="category">
                <AccordionTrigger className="text-base">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox
                        onCheckedChange={() => handleFilterChange("category", "Men")}
                        checked={selectedFilters.category.includes("Men")}
                      />
                      Men
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox
                        onCheckedChange={() => handleFilterChange("category", "Women")}
                        checked={selectedFilters.category.includes("Women")}
                      />
                      Women
                    </Label>
                    <Label className="flex items-center gap-2 font-normal">
                      <Checkbox
                        onCheckedChange={() => handleFilterChange("category", "Kids")}
                        checked={selectedFilters.category.includes("Kids")}
                      />
                      Kids
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible>
              <AccordionItem value="brand">
                <AccordionTrigger className="text-base">Brand</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-2">
                    {brands.map((brand) => (
                      <Label key={brand} className="flex items-center gap-2 font-normal">
                        <Checkbox
                        onCheckedChange={() => handleFilterChange("brand", brand)}
                        checked={selectedFilters.brand.includes(brand)}
                      />
                      {brand}
                      </Label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-4 md:hidden">
            <h1 className="text-2xl font-bold">Glasses</h1>
            <Button size="icon" variant="ghost" onClick={() => setIsFilterOpen(true)}>
              <FilterIcon className="h-6 w-6" />
              <span className="sr-only">Open Filters</span>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const productImages = images.filter((image) => image.productId === product.id)
              return (
                <ProductCard key={product.id} {...product} images={productImages} />
              )
            })}
          </div>
        </div>
      </div>
    )
  }
  
  function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
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
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
      </svg>
    )
  }
  
  function XIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
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
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </svg>
    )
  }