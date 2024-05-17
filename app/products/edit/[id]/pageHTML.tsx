"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PromiseReturnType } from "@prisma/client/extension"
import { getProduct } from "@/api/products/productsAPI";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ProductType, productSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import editProduct from "./action";

interface StateInterface {
    [index: string] : any
} 

interface EditHtmlParam {
    product : PromiseReturnType<typeof getProduct>
    imgBinary?: number[]
}

export default function EditHtml(
    {product, imgBinary} : EditHtmlParam) 
{
    const [preview, setPreview] = useState("");
    const [state, setState] = useState<StateInterface>(product as any);
    const [file, setFile] = useState<File>();

    const onPhotoChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => 
        {
            const { target: { files } } = e;
            if (!files) return;
            const file = files[0];
            const url = URL.createObjectURL(file);
            if(preview) URL.revokeObjectURL(preview);
            setFile(file);
            setPreview(url);
            console.log("File >> ", file);
        }, []
    );

    const onTextChange = useCallback(
        (e: 
            React.ChangeEvent<HTMLInputElement> | 
            React.ChangeEvent<HTMLTextAreaElement>
        ) => {
            const { target: { name, value } } = e;
            const newState = {
                ...state!,
                [name]: value,
            };

            setState(newState);
        }, [state]
    )
    
    useEffect( () => {
        // 파일이름과 확장자 분리
        const fileFormatSplit = product?.photo.split(".");
        const fileFormat = fileFormatSplit![fileFormatSplit!.length - 1];
        // 이진 바이너리를 Typed Array로 만들어 URL 생성 
        const imgBuffer = new Blob([new Uint8Array(imgBinary!)])
        const imageFile = new File([imgBuffer], product?.photo!, {type:`image/${fileFormat}`});
        const url = URL.createObjectURL(imageFile);
        setFile(imageFile);
        setPreview(url);
        
        return (() => {
            if (preview) URL.revokeObjectURL(preview);
        });
    }, [])
    
    // React Hook form 
    const { 
        register, handleSubmit, formState: { errors } 
    } = useForm<ProductType>({
        resolver: zodResolver(productSchema)
    })

    const onSubmit = handleSubmit(async ( data ) => {
        // photo (파일)가 선택 되어 있지 않다면...
        if (!file) { return; }

        const formData = new FormData();
        for (let key in data) {
            if (state && key in state!) {
                if(key !== "photo")
                    formData.append(key, state[key]);
                else 
                    formData.append(key, file);
            }
        }

        return editProduct(formData, product!.id);
    });

    const formAction = async () => {
        await onSubmit();
    }
    
    return (
        <div className="p-5">
            <form 
                action={formAction}
                className="
                    flex flex-col gap-2 mb-10
                "
            >
                {/* Picture */}
                <div className="relative aspect-square">
                    <label
                        htmlFor="photo"    
                        className="
                            flex justify-center items-center flex-col 
                            rounded-xl overflow-hidden
                            object-cover aspect-square  
                            cursor-pointer text-neutral-300 border-neutral-300 
                            bg-center bg-cover
                        "
                        style={{
                            backgroundImage: `url(${preview})`
                        }}
                    >
                    </label>
                    <input 
                        {...register("photo")}
                        id="photo"
                        type="file"
                        accept="image/*"
                        onChange={onPhotoChange}
                        className="hidden"
                    />
                </div>
                {/* title */}
                <div 
                    className="
                        flex flex-col flex-wrap 
                        *:flex *:flex-row *:flex-wrap
                        *:text-center *:items-center
                        *:border *:border-white
                        *:p-2 *:mt-2 *:w-full *:rounded-md
                    "
                >   
                    <div>
                        <span className="w-20"> Title </span>
                        <Input 
                            {...register("title")}
                            type="text"
                            onChange={onTextChange}
                            value={state?.title || ""}
                            placeholder={state?.title!}
                            errors={[errors.title?.message ?? ""]}
                            required
                            />
                    </div>
                    {/* Price */}
                    <div>
                        <span className="w-20"> Price </span>
                        <Input 
                            {...register("price")}
                            type="number"
                            onChange={onTextChange}
                            value={state?.price?.toString() || ""}
                            placeholder={state?.price?.toString()}
                            errors={[errors.title?.message ?? ""]}
                        />
                    </div>
                </div>
                
                {/* description */}
                <div className="flex flex-col gap-2">
                    <p> Description </p>
                    <textarea 
                        {...register("description")}
                        onChange={onTextChange}
                        value={state?.description}
                        placeholder={state?.description || ""}
                        className="
                            w-full resize-none text-black 
                            h-40
                        "
                    />
                </div>
                {/* 수정하기 버튼 */}
                <div 
                    className="
                        flex flex-row-reverse w-full gap-2 mt-2  
                    "
                >
                    <div>
                        <Button
                            text="수정하기"
                            style={"px-3"}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}