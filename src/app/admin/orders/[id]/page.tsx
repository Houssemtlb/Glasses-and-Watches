
import { SpecificOrderComponent } from "../_components/SpecificOrderComponent";

export default function SpecificOrderPage({ params: { id } }: { params: { id: string } }) {
  return (
    <>
      <SpecificOrderComponent id={id} />
    </>
  )
}



