import ProductInfos from "@/components/ProductInfos";
import { PurchaseForm } from "@/components/PurchaseForm";
import { getImagesByProductId, getProductById } from "@/lib/products";
import { SpecificProduct } from "../../_components/SpecificProduct";

export default async function SpecificGlassesPage({
    params: { id },
  }: {
    params: { id: string }
  })
  {
    return(
        <>
            <SpecificProduct id={id} />
        </>
    )
}
