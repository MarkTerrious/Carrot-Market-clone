"use client"

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import handleForm from "./action";

export default function Login() {
   const [state, action] = useFormState(handleForm, null);

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">당근 마켓</h1>
                <h2 className="text-xl">Login with email and password</h2>
            </div>
            <form
                method="post" 
                action={action} 
                className="flex flex-col gap-2">
                <FormInput 
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    errors={[""]}
                />
                <FormInput 
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={true}
                    errors={state?.errors || [""]}
                />
                <FormButton text={"Login"}/>
            </form>
            <SocialLogin />
        </div>
    )
}