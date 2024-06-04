"use client";

import { cachedGetPostComment } from "@/api/posts/cachedAPI";
import { formatToTimeAgo } from "@/lib/utils";
import { PromiseReturnType } from "@prisma/client/extension";
import Image from "next/image";

interface CommentListProps {
    comments: PromiseReturnType<typeof cachedGetPostComment>
}

export default function CommentList({ comments }: CommentListProps)
{

    return (
        <>
        { comments.map((comment) => {
            const username = comment.user.username.split("#")[0];
            return (
                <div 
                    key={comment.id} 
                    className="
                        flex flex-wrap gap-3
                    "
                >
                    <span> {username} </span>
                    <Image 
                        width={28}
                        height={28}
                        src={comment.user.avatar! || ""}
                        alt=""
                        className="
                            rounded-full size-7
                        "
                    />
                    <span> {comment.payload} </span>
                    <span> {formatToTimeAgo(comment.created_at.toString())} </span>
                </div>
            )
        })}
        </>
    )
}