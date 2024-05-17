/**
 * 구현 내용
        게시판 : 제목, 내용, 좋아요 수
        유저 : 좋아요 누르기 상호작용
 */
import { cachedGetPost, cachedLikeStatus } from "@/api/posts/cachedAPI";
import { getSession } from "@/lib/session";
import { EyeIcon, HandThumbUpIcon } from "@heroicons/react/24/solid";
import { HandThumbUpIcon as OutlineHandThumbUpIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { formatToTimeAgo } from "@/lib/utils";
import { dislikePost, likePost } from "./action";

export default async function PostDetail( {
    params
} : {
    params: { id: string }
}) {
    const postId = Number(params.id);
    if(isNaN(postId)) {
        return notFound();
    }

    const post = await cachedGetPost(postId); 
    if( !post ) {
        return notFound();
    }
    
    const session = await getSession();
    const { likeCount, isLiked } = await cachedLikeStatus(postId, session.id!);

    console.log("POST >> ", post, isLiked);
    return (
        <div className="p-5 text-white">
        <div className="flex items-center gap-2 mb-2">
            <Image
                width={28}
                height={28}
                className="size-7 rounded-full"
                src={post.user.avatar!}
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
                <form action={ isLiked 
                    ? async () => {
                        "use server" 
                        return dislikePost(postId, session.id!); 
                    } 
                    : async () => {
                        "use server"
                        return likePost(postId, session.id!)
                    }
                }>
                <button
                    className={`
                    flex items-center gap-2 text-neutral-400 text-sm border 
                    border-neutral-400 rounded-full p-2  transition-colors 
                        ${ isLiked
                            ? "bg-orange-500 text-white border-orange-500"
                            : "hover:bg-neutral-800"
                        }
                    `}
                >
                    { isLiked ? (
                        <HandThumbUpIcon className="size-5" />
                    ) : (
                        <OutlineHandThumbUpIcon className="size-5" />
                    )}
                    { isLiked ? (
                        <span> {likeCount}</span>
                    ) : (
                        <span>공감하기 ({likeCount})</span>
                    )}
                </button>
                </form>
            </div>
        </div>
    );
}