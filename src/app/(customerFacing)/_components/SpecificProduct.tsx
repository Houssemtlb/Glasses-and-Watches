import ProductInfos from "@/components/ProductInfos";
import { getImagesByProductId, getProductById } from "@/lib/products";

export async function SpecificProduct({id}:{id: string}) {

    const product = await getProductById(id);
    const images = await getImagesByProductId(id);
    if(!product) return null;
    const props = {
        ...product,
        images,
    };

    return(
        <ProductInfos
            id={props.id}
            name={props.name}
            price={props.price}
            description={props.description}
            type={props.type}
            brand={props.brand}
            category={props.category}
            images={props.images}
        />
    )
}