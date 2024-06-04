import { z } from "zod";

export const postSchema = z.object({
    comment: z.string({
        required_error: "댓글을 입력 해주세요."
    })
})

export type PostType = z.infer<typeof postSchema>