"use client";

import Image from "next/image";
import LikeButton from "@/components/like-button"
import { formatToTimeAgo } from "@/lib/utils";
import { EyeIcon } from "@heroicons/react/24/solid";
import { DbPostCommentType, DbPostType } from "@/api/posts/cachedAPI";
import Comment from "@/components/comments/comment";
import {  useRef } from "react";
import { User } from "@prisma/client";
import { addComment } from "./action";
import { PostUserInfo } from "./page";

// Partial<User> | null | undefined,
interface PostDetailHTMLProps {
    userProfile: PostUserInfo | undefined | null,
    postId: number,
    likeCount: number,
    isLiked: boolean,
    post: DbPostType,
    comments: DbPostCommentType,
}

export default function PostDetailHTML(
    { userProfile, postId, likeCount, isLiked, post, comments } : PostDetailHTMLProps 
) {    
    if (!post) { return }
    const commentRef = useRef<HTMLInputElement>(null);
    const onEnrollComment = async (formData: FormData) => {
        const comment = formData.get("comment") as string;

        if (comment !== "" || comment !== undefined)
            await addComment({
                userId: userProfile!.id!,
                postId: postId,
                comment: comment,
            })
            if ( commentRef.current)
                commentRef.current.value = ""
    }
  
    return (
        <div className="p-5 text-white">
            <div className="flex items-center gap-2 mb-2">
                <Image
                    width={28}
                    height={28}
                    className="size-7 rounded-full"
                    src={post.user.avatar! || ""}
                    alt={post.user.username}
                />
                <div>
                <span className="text-sm font-semibold">{post.user.username}</span>
                <div className="text-xs">
                    <span>{formatToTimeAgo(post.created_at.toString())}</span>
                </div>
                </div>
            </div>
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="mb-5">{post.description}</p>
            <div className="flex flex-col gap-5 items-start">
                <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <EyeIcon className="size-5" />
                <span>조회 {post.views}</span>
                </div>
                {/* Button */}
                <LikeButton 
                    likeCount={likeCount} 
                    isLiked={isLiked} 
                    postId={postId} 
                    userId={userProfile?.id!}
                />
            </div>
            {/* Comment */}
            <Comment 
                postId={postId} 
                userId={userProfile?.id!} 
                comments={comments} 
                ref={commentRef}
                onEnrollComment={onEnrollComment}
            />
        </div>
    )
}