import { PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constant";
import db from "@/lib/db";
import { z } from "zod";

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

export const schema = z.object({
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