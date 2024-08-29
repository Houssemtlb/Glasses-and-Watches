
import { SpecificProduct } from "../../_components/SpecificProduct";

export default async function SpecificGlassesPage({
    params: { id },
  }: {
    params: { id: string }
  })
  {
    return(
        <div className="container space-y-12 my-12 pb-10">
            <SpecificProduct id={id} />
        </div>
    )
}
