
import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { DeleteDropdownItem } from "./_components/OrderActions";

export default function AdminOrdersPage(){
    return(
        <>
            <div className="flex justify-between gap-4">
                <PageHeader>Orders</PageHeader>
            </div>
            <OrdersTable />
        </>
    ) 
}

async function OrdersTable() {
    const orders = await db.order.findMany({
        select: {
            id: true,
            totalPrice: true,
            quantity: true,
            isValidated: true,
            createdAt: true,
        },
        orderBy: { createdAt: "desc" },
    })

    if (orders.length === 0) return <p>No orders found</p>

    return (
        <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Total Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Valid</TableHead>
                <TableHead className="w-0">
                    <span className="sr-only">Actions</span>
                </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                <TableRow key={order.id} className="hover:bg-gray-100 cursor-pointer">
                    <TableCell>{order.id}</TableCell>
                    <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.createdAt.toISOString().split('T')[0]}</TableCell>
                    <TableCell>
                        {order.isValidated ? (
                            <CheckCircle2 className="text-green-500" />
                        ) : (
                            <XCircle className="text-red-500" />
                        )}
                    </TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                        <MoreVertical />
                        <span className="sr-only">Actions</span>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                        <DropdownMenuItem>
                            <Link href={`/admin/orders/${order.id}`} key={order.id}>Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DeleteDropdownItem id={order.id} />
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
