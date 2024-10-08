import React, { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Categories, Colors } from "@/lib/enums";

export type productType = {
  id: string;
  name: string;
  description: string;
  type: string;
  brand: string;
  category: string;
  price: number;
  color: string;
  dimensions: string | null;
};

export type imagesType = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  path: string;
  productId: string;
};

export function FilterList({ products, images, brands, direction }: { products: productType[]; images: imagesType[]; brands: string[], direction: string }) {
  const colorOptions = Object.values(Colors);
  const categoryOptions = Object.values(Categories);

  const [selectedFilters, setSelectedFilters] = useState<{ category: string[]; brand: string[]; color: string[] }>({
    category: [],
    brand: [],
    color: [],
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

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
    }if(type === "color"){
      setSelectedFilters({
        ...selectedFilters,
        color: selectedFilters.color.includes(value)
          ? selectedFilters.color.filter((item) => item !== value)
          : [...selectedFilters.color, value],
      })
    }
    setCurrentPage(1); 
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (selectedFilters.category.length > 0 && !selectedFilters.category.includes(product.category)) {
        return false;
      }
      if (selectedFilters.brand.length > 0 && !selectedFilters.brand.includes(product.brand)) {
        return false;
      }
      if (selectedFilters.color.length > 0 && !selectedFilters.color.includes(product.color)) {
        return false;
      }
      return true;
    });
  }, [selectedFilters, products]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, filteredProducts]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="grid md:grid-cols-[200px_1fr] gap-10">
      <div
        className={`fixed overflow-scroll sm:overflow-auto top-0 left-0 z-20 h-full w-full bg-background md:static md:block ${
          isFilterOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0`}
      >
        <div className="flex h-14 items-center justify-between border-b px-4 md:hidden">
          <h2 className="text-lg font-semibold">Filtres</h2>
          <Button size="icon" variant="ghost" onClick={() => setIsFilterOpen(false)}>
            <XIcon className="h-6 w-6" />
            <span className="sr-only">Fermer</span>
          </Button>
        </div>
        <div className="px-4 py-6 md:px-0">
          <Accordion type="single" collapsible>
            <AccordionItem value="category">
              <AccordionTrigger className="text-base">Catégorie</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {categoryOptions.map((category) => (
                    <Label key={category} className="flex items-center gap-2 font-normal">
                      <Checkbox
                        onCheckedChange={() => handleFilterChange("category", category)}
                        checked={selectedFilters.category.includes(category)}
                      />
                      {category}
                    </Label>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible>
            <AccordionItem value="brand">
              <AccordionTrigger className="text-base">Marque</AccordionTrigger>
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
          <Accordion type="single" collapsible>
            <AccordionItem value="color">
              <AccordionTrigger className="text-base">Couleur</AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-2">
                  {colorOptions.map((color) => (
                    <Label key={color} className="flex items-center gap-2 font-normal">
                      <Checkbox
                        onCheckedChange={() => handleFilterChange("color", color)}
                        checked={selectedFilters.color.includes(color)}
                      />
                      {color}
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
            <h1 className="text-lg font-semibold">{direction}</h1>
          <Button size="sm" variant="default" onClick={() => setIsFilterOpen(true)}>
            <FilterIcon className="h-6 w-6" />
            <span className="sr-only">Ouvrir les filtres</span>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => {
            const productImages = images.filter((image) => image.productId === product.id);
            return <ProductCard key={product.id} {...product} images={productImages} />;
          })}
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            &lt;
          </Button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
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
  );
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
  );
}