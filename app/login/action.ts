"use server"

import bcrypt from "bcrypt";
import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import db from "@/lib/db";
import {z} from "zod";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function retrieveEmail(uEmail:string) {
    const user = await db.user.findUnique({
        where: {
            email: uEmail
        },
        select: {
            id: true,
        }
    });

    return Boolean(user);
}

const schema = z.object({
    email: 
        z.string()
        .toLowerCase()
        .email("should be email")
        .refine(retrieveEmail, "This email doesn't exist!"),
    password: z.string({
        required_error: "Password is required"
    }).min(4, "should be above 4 characters").regex(
        PASSWORD_REGEX,
        PASSWORD_REGEX_ERROR
    )
});

async function handleForm(prevState:any, formData:FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    };
    
    const result = await schema.spa(data);
    if(!result.success) {
        console.log("FAIL >> ", result.error.flatten());
        return result.error.flatten();
    }else {
        // console.log("SUCCESS >> ", result.data);
        const user = await db.user.findUnique({
            where: {
                email: result.data.email
            },
            select: {
                id: true,
                password: true,
            }
        });

        const ok = await bcrypt.compare(
            result.data.password, 
            user!.password || "xxxx"
        );        
        
        if(ok) {
            const session = await getSession();
            session.id = user!.id;
            await session.save();
            redirect("/profile");
        } else {
            return {
                fieldErrors: {
                    password: ["Wrong password."],
                    email: []
                }
            }
        }
    }
}


export default handleForm;