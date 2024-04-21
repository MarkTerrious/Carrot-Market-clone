"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import { useFormState } from "react-dom";
import { SMSLogin } from "./action";

const initialState = {
    token: false,
    error: undefined,
}

export default function SMSLoginPage() {
    /** FormError는 z.object() 밖에 validaition 정의한 경우 */
    /** FieldError는 z.object() 안에 validation 정의한 경우 */
    /** 밖에 정의 해도 따로 path:[""] 넣어주면 경로 지정 가능 */
    const [state, action] = useFormState(SMSLogin, initialState);
    
    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">SMS Login</h1>
                <h2 className="text-xl">Verify your phone number</h2>
            </div>
            <form action={action} className="flex flex-col gap-2 relative">
                <Input 
                    name="token"
                    type={`${state?.token ? "number" : "hidden"}`}
                    placeholder="Verification Code - 000000"
                    required={true}
                    min={100000}
                    max={999999}
                    errors={state.error?.formErrors}
                    btnHidden={`${state?.token ? "number" : "hidden"}`}
                />
                <Input 
                    name="phone"
                    type={`${state?.token ? "hidden" : "text"}`}
                    placeholder="Phone number"
                    required={true}
                    errors={state.error?.formErrors}
                    btnHidden={`${state?.token ? "hidden" : "text"}`}
                />
                <Button 
                    text={state.token 
                        ? "Verify"
                        : "Send Verification SMS"
                    }    
                />
            </form>
        </div>
    )
}