"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useCallback, useEffect, useState } from "react";
import uploadProduct from "./action";
import { useForm } from "react-hook-form";
import { UploadType, uploadSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";

export default function AddProduct() {
    const [preview, setPreview] = useState("");
    const onImageChange = useCallback(
        async (event:React.ChangeEvent<HTMLInputElement>) => 
    {
        const { target: { files } } = event;

        if(!files) return;

        const file = files[0];
        const url = URL.createObjectURL(file);
        setPreview(url);
    },[]);
    
    /**
     * register : state value
     * handleSubmit : The User function to excute at form action
     * formState: The Object about Entire form state 
            return { isValid, isValidating, isSubmitted, isSubmitting, isSubmitSuccessful, errors...}
     * 
     */
    const [state, action] = useFormState(uploadProduct,null);

    return (
    <div>
        <form className="p-5 flex flex-col gap-5" action={action}>
        {/* Label htmlFor --> Other HTMLElement id, works as that HTMLElem  */}
            <label
                htmlFor="photo"
                className="border-2 aspect-square  
                    flex justify-center items-center flex-col 
                    text-neutral-300 border-neutral-300 
                    rounded-md border-dashed cursor-pointer 
                    bg-center bg-cover"
                style={{
                    backgroundImage: `url(${preview})`
                }}    
            >
            { 
            preview 
                ? null 
                : <div>
                    <PhotoIcon className="w-20" />
                    <div className="text-neutral-400 text-sm">
                        사진을 추가해주세요.  
                    </div>
                    {
                        state?.fieldErrors.photo  
                        ?   <p className="text-red-500 text-sm">
                                {state.fieldErrors.photo}
                            </p>
                        : null
                    }
                  </div>
            }
            </label>
            {
                state?.fieldErrors.photo  
                ?   <p className="text-red-500 text-sm">
                        {state.fieldErrors.photo}
                    </p>
                : null
            }
            <input
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                onChange={onImageChange}
                className="hidden"
            />
            <Input 
                name="title"
                placeholder="제목" 
                type="text"
                errors={state?.fieldErrors.title} 
                required
            />
            <Input 
                name="price"
                type="number" 
                placeholder="가격" 
                errors={state?.fieldErrors.price}
                required 
            />
            <Input
                name="description"
                type="text"
                placeholder="자세한 설명"
                errors={state?.fieldErrors.description}
                required
            />
            <Button text="작성 완료" />
        </form>
    </div>
    );
}