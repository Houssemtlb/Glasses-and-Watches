"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useTransition } from "react"

import { useRouter } from "next/navigation"
import { deleteUser } from "../../_actions/users"

export function DeleteDropdownItem({
    id,
  }: {
    id: string
  }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    return (
      <DropdownMenuItem
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            await deleteUser(id)
            router.refresh()
          })
        }}
      >
        Delete
      </DropdownMenuItem>
    )
  }