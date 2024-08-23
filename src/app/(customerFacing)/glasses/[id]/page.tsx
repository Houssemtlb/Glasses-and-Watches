
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
