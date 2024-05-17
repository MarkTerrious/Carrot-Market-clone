"use server";

import { unstable_cache } from "next/cache";
import { getLikeStatus, getPost } from "./postsAPI";
import { revalidate_like_stat, revalidate_post } from "./revalidation";

export const cachedGetPost = unstable_cache(getPost, ["GET_CACHED_POST"], {
    tags: ["GET_CACHED_POST", revalidate_post],
    revalidate: 60
});

export async function cachedLikeStatus(postId:number, userId:number) 
{
    const cachedStatus = unstable_cache(getLikeStatus, ["CACHED_LIKE_STATUS"], {
        revalidate: 60,
        tags: ["CACHED_LIKE_STATUS", revalidate_like_stat(postId)]
    });

    return cachedStatus(postId, userId);
}