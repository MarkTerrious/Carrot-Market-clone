"use server";

import { unstable_cache } from "next/cache";
import { getLikeStatus, getPost, getPostComment } from "./postsAPI";
import { revalidate_like_stat, revalidate_post, revalidate_post_comment } from "./revalidation";
import { Prisma } from "@prisma/client";

export async function cachedGetPost(postId: number) 
{
    const cachedPost = unstable_cache(getPost, ["GET_CACHED_POST"], {
        tags: ["GET_CACHED_POST", revalidate_post(postId)],
        revalidate: 60
    });

    return cachedPost(postId);
}

export async function cachedGetPostComment(postId: number) 
{
    const cachedComments = unstable_cache(getPostComment, ["GET_CACHED_POST_COMMENT"], {
        tags: ["GET_CACHED_POST_COMMENT", revalidate_post_comment(postId)],
        revalidate: 60
    });

    return cachedComments(postId);
}


export async function cachedLikeStatus(postId:number, userId:number) 
{
    const cachedStatus = unstable_cache(getLikeStatus, ["CACHED_LIKE_STATUS"], {
        tags: ["CACHED_LIKE_STATUS", revalidate_like_stat(postId)],
        revalidate: 60,
    });

    return cachedStatus(postId, userId);
}

export type DbPostType = Prisma.PromiseReturnType<typeof cachedGetPost>;
export type DbPostCommentType = Prisma.PromiseReturnType<typeof cachedGetPostComment>;