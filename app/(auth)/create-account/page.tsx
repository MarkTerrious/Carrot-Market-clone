"use client";

import Input from "@/components/input";
import Button from "@/components/button";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import createAccount from "./action";
import { PASSWORD_MIN_LENGTH } from "@/lib/constant";

export default function CreateAccount() {
    const [state, dispatch] = useFormState(createAccount, null);

    return (
        <div className="flex flex-col gap-10 py-8 px-6">
            <div className="flex flex-col gap-2 *:font-medium">
                <h1 className="text-2xl">안녕하세요!</h1>
                <h2 className="text-xl">Fill in the form below to join</h2>
            </div>
            <form action={dispatch} className="flex flex-col gap-3">
                <Input 
                    name="username"
                    type="text"
                    placeholder="Username"
                    required={true}
                    errors={state?.fieldErrors.username}
                />
                <Input 
                    name="email"
                    type="email"
                    placeholder="Email"
                    required={true}
                    errors={state?.fieldErrors.email}
                />
                <Input 
                    name="password"
                    type="password"
                    placeholder="Password"
                    minLength={PASSWORD_MIN_LENGTH}
                    required={true}
                    errors={state?.fieldErrors.password}
                />
                <Input 
                    name="confirm_password"
                    type="password"
                    placeholder="Password Confirm"
                    minLength={PASSWORD_MIN_LENGTH}
                    required={true}
                    errors={state?.fieldErrors.confirm_password}
                />
                <Button 
                    text={"Create account"}    
                />
            </form>
            <SocialLogin />
        </div>
    )
}