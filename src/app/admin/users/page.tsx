import { Button } from "@/components/ui/button";
import { PageHeader } from "../_components/PageHeader";
import Link from "next/link";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import db from "@/db/db";
import { formatCurrency, formatNumber } from "@/lib/formatters";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { CheckCircle2, XCircle, MoreVertical } from "lucide-react";
import { DeleteDropdownItem } from "./_components/UserActions";

// asChild makes the button a child of the button component

export default function AdminUsersPage(){
    return(
        <>
            <div className="flex justify-between gap-4">
                <PageHeader>Products</PageHeader>
            </div>
            <UsersTable />
        </>
    ) 
}



async function UsersTable() {
    const users = await db.user.findMany({
      select: {
        id: true,
        firstName : true,
        lastName : true,
        email : true,
        phone : true,
        wilaaya : true,
        address : true,
        _count: { select: { orders: true } },
      },
      orderBy: { createdAt: "desc" },
    })
  
    if (users.length === 0) return <p>No users found</p>
  
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Wilaaya</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead className="w-0">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.wilaaya}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user._count.orders}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <MoreVertical />
                    <span className="sr-only">Actions</span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DeleteDropdownItem
                      id={user.id}
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