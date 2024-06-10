"use server";

import { revalidate_posts_whole } from "@/api/posts/revalidation";
import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const uploadPostSchema = z.object({
    title: z.string({
        invalid_type_error: "Should be string",
        required_error: "must be some text here"
    }),
    description: z.string({
        invalid_type_error: "Should be string"
    }),
});

export async function uploadPost(formData: FormData) {
    const data = {
        title: formData.get("title"),
        description:  formData.get("description")
    };

    const result = uploadPostSchema.safeParse(data)

    if ( !result.success ) { 
        return result.error.flatten();
    }

    const session = await getSession();
    const db_result = await db.post.create({
        data: {
            userId: session.id!,
            title: result.data.title,
            description: result.data.description,
        }
    });

    console.log("db_result ? >> ", db_result);

    revalidateTag(revalidate_posts_whole());
    redirect("/life");
}