"use server";

import { revalidate_like_stat } from "@/api/posts/revalidation";
import db from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function likePost(postId:number, userId:number)
{
    // Like Table에 생성
    try {
        await db.like.create({
            data: {
                postId,
                userId
            }
        });
        revalidateTag(revalidate_like_stat(postId));
    } catch (e) {
        return;
    }
}

export async function dislikePost(postId:number, userId:number) 
{
    // like Table에서 삭제
    try {
        await db.like.delete({
            where: {
                likeId: {
                    postId,
                    userId
                }
            }
        });
        revalidateTag(revalidate_like_stat(postId));
    } catch(e) {
        return;
    }
}