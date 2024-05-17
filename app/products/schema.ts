import { z } from "zod";

export const MAX_FILE_SIZE = 1000 * 1000 * 5;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const productSchema = z.object({
        photo: (typeof window === "undefined") ? z
            .instanceof(File)
            .superRefine((file, ctx) => {
                if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
                    ctx.addIssue({
                        code: "custom",
                        message: "support only for jpeg, jpg, png",
                        fatal: true
                    });
                }
                return z.NEVER;
            })
            .refine((file) => file.size <= MAX_FILE_SIZE, "Image size over")
            : z.any({ required_error: "File needed" }),
        title: z.string({required_error: "Title is required"}),
        price: z.coerce.number({required_error: "Price is required"}),
        description:z.string({required_error: "Description is required"}),
});


export type ProductType = z.infer<typeof productSchema>

/**
 * ,
 *  z.instanceof(File, {message:"필수!"}),
 *  
 * 
 */