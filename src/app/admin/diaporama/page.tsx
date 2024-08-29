"use client"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import { editDiapo } from "../_actions/diaporama"


export default function DiaporamaEditPage() {
    const [error, action] = useFormState(
        editDiapo,
        {}
      )
  return (
    <form action={action}  className="space-y-8">
        <div>
        <Label htmlFor="images">Images</Label>
        <Input type="file" id="images" name="images" multiple required={true} />
        {error?.images && <div className="text-destructive">{error?.images}</div>}
      </div>
      <SubmitButton />
    </form>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving..." : "Save"}
    </Button>
  )
}