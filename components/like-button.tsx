"use client";

import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import { startTransition, useCallback, useOptimistic } from "react";
import { dislikePost, likePost } from "@/app/posts/[id]/action";

interface LikeButtonInterface{
    likeCount: number,
    isLiked: boolean,
    postId: number,
    userId: number,
}

export default function LikeButton(
    {likeCount, isLiked, postId, userId} : LikeButtonInterface
) {
    const [CLICKED, UNCLICKED] = ["CLICKED", "UNCLICKED"];
    const [state, reducer] = useOptimistic(
        {likeCount, isLiked}, 
        (prevState, action) => {
            switch(action) {
                case CLICKED : {
                    return {
                        likeCount: prevState.likeCount + 1,
                        isLiked: true,
                    }
                }
                case UNCLICKED : {
                    return {
                        likeCount: prevState.likeCount - 1,
                        isLiked: false,
                    }
                }
                default: return prevState
            }
        }
    );
    
    const likeToggle = useCallback(async (isLiked:boolean)=> {
        if (isLiked) {
            startTransition(() => reducer(UNCLICKED));
            await dislikePost(postId, userId);
        } else {
            startTransition(() => reducer(CLICKED));
            await likePost(postId, userId);
        }
    },[]);

    return (
        <button
            onClick={() => likeToggle(state.isLiked)!}
            className={`
                flex items-center gap-2 text-neutral-400 text-sm border 
                border-neutral-400 rounded-full p-2  transition-colors 
                ${ isLiked
                    ? "bg-orange-500 text-white border-orange-500"
                    : "hover:bg-neutral-800"
                }
            `}
        >
            { state.isLiked ? (
                <HandThumbUpIcon className="size-5" />
            ) : (
                <OutlineHandThumbUpIcon className="size-5" />
            )}
            { state.isLiked ? (
                <span> {state.likeCount}</span>
            ) : (
                <span>공감하기 ({state.likeCount})</span>
            )}
        </button>
    )
}