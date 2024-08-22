import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { ActiveToggleDropdownItem, DeleteDropdownItem } from "./_components/ProductActions";

// asChild makes the button a child of the button component

export default function AdminProductPage(){
    return(
        <>
            <div className="flex justify-between gap-4">
                <PageHeader>Products</PageHeader>
                <Button asChild> 
                    <Link href="/admin/products/new">New Product</Link>
                </Button>
            </div>
            <ProductsTable />
        </>
    ) 
}



async function ProductsTable() {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        type: true,
        brand: true,
        category: true,
        isAvailableForPurchase: true,
        _count: { select: { orders: true } },
      },
      orderBy: { name: "asc" },
    })
  
    //if (products.length === 0) return <p>No products found</p>
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-0">
              <span className="sr-only">Available For Purchase</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map(product => (
            <TableRow key={product.id}>
              <TableCell>
                {product.isAvailableForPurchase ? (
                  <>
                    <span className="sr-only">Available</span>
                    <CheckCircle2 />
                  </>
                ) : (
                  <>
                    <span className="sr-only">Unavailable</span>
                    <XCircle className="stroke-destructive" />
                  </>
                )}
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.type}</TableCell>
              <TableCell>{product.brand}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{formatNumber(product._count.orders)}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <a download href={`/admin/products/${product.id}/download`}>
                        Download
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/products/${product.id}/edit`}>
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <ActiveToggleDropdownItem
                      id={product.id}
                      isAvailableForPurchase={product.isAvailableForPurchase}
                    />
                    <DropdownMenuSeparator />
                    <DeleteDropdownItem
                      id={product.id}
                      disabled={product._count.orders > 0}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }