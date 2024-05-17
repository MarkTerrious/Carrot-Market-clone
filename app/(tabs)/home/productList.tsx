/**
 *  원래 무한 스크롤 사용 시 메인 스레드에서
        Intersection detection routines 규칙에 따라 구현했음 
    --> 이는 지속적인 폴링 때문에 이미지 로딩 및 스크롤 지연이 발생.
    (스크롤이 임계점을 넘었는지 주기적으로 검사 했어야 했음.)
    Intersection Observer 사용 시 비동기 적으로 사용
    제한 된 수의 이미지 로딩
 */
"use client";

import ListProduct from "@/components/list-product";
import { InitialProducts} from "./page";
import { useEffect, useRef, useState } from "react";
import { getCachedProducts} from "@/api/products/cachedAPI";

interface ProductsListProps {
    initialProducts: InitialProducts
}

export const revalidate = 5;

export default function ProductList({initialProducts}:ProductsListProps) 
{
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [isLast, setIsLast] = useState(false);
    const trigger = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
        // 옵저버 생성.
        /**
         * Entry []  = All Observing Item 관찰 되고 있는 모든 엘리먼트
         * Observer Entry를 관찰
         */
        console.log("START");
        const observer =  new IntersectionObserver(
            async(
                entries: IntersectionObserverEntry[], 
                observer: IntersectionObserver
            ) => {
                const element = entries[0];
                // isIntersecting --> 관찰 객체가 UI에 보이는가 
                if (element.isIntersecting && trigger.current) {
                    observer.unobserve(trigger.current);
                    // fetch datas of next page.
                    setIsLoading(true);
                    const newProducts = await getCachedProducts(page + 1);
                    
                    if (newProducts){
                        if (newProducts.length !== 0) {
                            // revalidateTag(productRevalidate);
                            setProducts((prev) => [...prev, ...newProducts])
                            setPage((prev) => prev + 1);
                        } else {
                            setIsLast(true);
                        }
                    }
                    setIsLoading(false);
                }
               
            }, {
                threshold: 1.0,
            }
        ); 
        
        console.log("END");
        if(trigger.current) {
            // 옵저버가 관찰할 HTMLElement를 설정한다.
            observer.observe(trigger.current);
        }

        return (() => { observer.disconnect(); });
    }, [page]);


    return (    
        <div className="p-5 flex flex-col gap-5">
           {products.map((product) => (
                <ListProduct key={product.id} {...product} />
           ))}
           <div className="mb-14"/>
           {isLast  
            ?   null
            :   <span
                    ref={trigger}
                    className="
                        text-sm font-semibold bg-orange-500 w-fit mx-auto
                        px-3 py-2 rounded-md hover:opacity-90 active:scale-95
                    "
                >
                    {isLoading ? "로딩 중" : "Load more"}
                </span> 
            }
        </div>
    );
}

/**
 * 
 * const onLoadMoreClick = async () => {
        setIsLoading(true);
        const newProducts = await getProducts(page + 1);
        if (newProducts.length !== 0) {
            setProducts((prev) => [...prev, ...newProducts])
            setPage((prev) => prev + 1);
        } else {
            setIsLast(true);
        }
        setIsLoading(false);
    }
 */