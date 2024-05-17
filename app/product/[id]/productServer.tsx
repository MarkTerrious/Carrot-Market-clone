import { deleteProduct, getIsOwner, getProduct } from "@/api/products/productsAPI";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import ProductDetailHTML from "./productDetailHTML";

interface ProductListProps {
    params : { id : string },
    modal? : boolean 
}

export async function ProductDetail(
    { params, modal=false } : ProductListProps
) {
    // check whether the id is number or not.
    const id = Number(params.id);
    if (isNaN(id)) return notFound();
    
    // bring user information of the item.
    const product = await getProduct(id);
    if (!product) return notFound();

    const session = await getSession();

    // bring the id of the item to check whether this person is owner
    const isOwner = await getIsOwner(product.userId);
    const delFunc = await deleteProduct({
        productID: product.id,
        userId: session.id
    }); 
    const editUrl = isOwner ? `/products/edit/${product.id}` : undefined;

    return (
        <ProductDetailHTML 
            product={product}
            isOwner={isOwner} 
            delFunc={delFunc}
            editUrl={editUrl}
            modal={modal}
        />
    )
}