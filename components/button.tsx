"use client"
import { useFormStatus } from "react-dom";

interface ButtonInterface {
    text: string;
}

export default function Button({text}:ButtonInterface) {
    /*
        useFromStatus()
        1. 자동으로 자기자신의 부모 form을 찾을 것이다.
        2. action이 pending/ fullfiled/ rejected 인지 자동으로 알게된다.
        3. 반드시 form의 자식요소로 사용된다.   
    */
    const {pending} = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending} 
            className="
                primary-btn h-10
                disabled:bg-neutral-500
                disabled:text-neutral-400
                disabled:cursor-not-allowed
            "
        >
            {pending ? "서버와 대화중.." : text}
        </button>
    )
}