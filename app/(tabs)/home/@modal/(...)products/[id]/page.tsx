import ProductDetail from "@/app/products/[id]/page";
import Modal from "@/components/modal";

export default async function ProductsModal({
    params
}: {
    params: { 
        id: string
    }
}) {
    return ( 
        <Modal>
            <ProductDetail params={params} modal={true}/>
        </Modal>
    )
}