"use server"

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { schema } from "./login_validation";
import { SafeParseSuccess } from "zod";
import { AllUserProperty } from "@/api/sharedDB/types";
import { RequireAtLeastone } from "@/lib/types";
import { saveSessionData } from "@/api/session";

async function handleForm(prevState:any, formData:FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    };
    
    const result = await schema.spa(data);

    if ( !result.success ) {
        console.log("FAIL >> ", result.error.flatten());
        return result.error.flatten();
    } else {
        // check if user already exist or not.
        const user = await fetchUserIdPwd(result);
        let errorMsg = "Need to check email"

        if (user) {
            // if user exist, once compare password betweend db and form
            const ok = await bcrypt.compare(
                result.data.password, 
                user!.password || "xxxx"
            );        
        
            if(ok) {
                // password checked!, redirect to /profile !
                saveSessionData({ id: user.id, rUrl: "/profile" });
            } 
            // password wrong!
            errorMsg = "Wrong Password!"
        } 

        return { 
            fieldErrors: {
                password: [errorMsg],
                email: []
            }
        }
    }
}


async function fetchUserIdPwd(result : 
    SafeParseSuccess<RequireAtLeastone<AllUserProperty>>) 
{
    const user = await db.user.findUnique({
        where: {
            email: result.data.email,
        },
        select: {
            id: true,
            password: true,
        }
    });

    return user;
}

export default handleForm;