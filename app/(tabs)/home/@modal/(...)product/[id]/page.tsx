import { ProductDetail } from "@/app/product/[id]/productServer";
import Modal from "@/components/modal";

export default async function ProductsModal({
    params
}: {
    params: { 
        id: string
    }
}) {
    const originUrl = `/product/${params.id}`;

    return ( 
        <Modal url={originUrl}>
            <ProductDetail params={params} modal={true} />
        </Modal>
    )
}