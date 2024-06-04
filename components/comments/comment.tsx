"use client";

import { cachedGetPostComment } from "@/api/posts/cachedAPI";
import { PromiseReturnType } from "@prisma/client/extension";
import CommentInputBox from "./commentInput";
import CommentList from "./commentList";
import { ForwardedRef, forwardRef } from "react";

interface CommentProps {
    postId : number,
    userId: number,
    comments:PromiseReturnType<typeof cachedGetPostComment>
    onEnrollComment: (...args: any) => any
}

export function Comment({
        postId,
        userId,
        comments,
        onEnrollComment,
        ...rest
} : CommentProps,
ref : ForwardedRef<HTMLInputElement>
) {
    return (
        <div className="
                    mt-3 flex flex-col gap-3
                "
            >
                <CommentInputBox 
                    id={postId} 
                    action={onEnrollComment}
                    ref={ref}
                />
                <CommentList comments={comments} />
        </div>
    )
}

export default forwardRef(Comment);