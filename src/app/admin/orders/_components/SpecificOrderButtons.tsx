"use client"

import { Button } from "@/components/ui/button"
import { deleteOrder, toggleValidateOrder } from "../../_actions/orders"
import { useTransition } from "react"
import { redirect, useRouter } from "next/navigation"

export function ToggleValidateOrderButton({ id, isValid }: { id: string, isValid:boolean }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return(
        <Button className={isValid ? "w-full sm:w-auto bg-yellow-600 hover:bg-yellow-500" : "w-full sm:w-auto bg-green-600 hover:bg-green-500"} onClick={() => {startTransition(async () => {
                await toggleValidateOrder(id)
                router.refresh()
                redirect("/admin/orders")
            })
        }}>
        {isValid ? "Unvalidate order" : "Validate order"}
        </Button>
    )
}

export function DeleteOrderButton({ id }: { id: string }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return(
        <Button disabled={isPending} variant="destructive" className="w-full sm:w-auto" onClick={() => {startTransition(async () => {
            await deleteOrder(id)
            router.refresh()
            redirect("/admin/orders")
        })
    }}>
        Delete Order
    </Button>
    )
}