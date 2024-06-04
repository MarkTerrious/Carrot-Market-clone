/**
 * 구현 내용
        게시판 : 제목, 내용, 좋아요 수
        유저 : 좋아요 누르기 상호작용
 */
import { cachedGetPost, cachedGetPostComment, cachedLikeStatus } from "@/api/posts/cachedAPI";
import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";
import PostDetailHTML from "./pageHTML";
import { cachedGetUserInfo } from "@/api/user/cachedAPI";
import { User } from "@prisma/client";

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
    const postUserParam: userParamInterface= {
        "id": true,
        "avatar": true,
        "username": true,
    }
    const [{likeCount, isLiked}, comments, userProfile] = await Promise.all([
        cachedLikeStatus(postId, session.id!), 
        cachedGetPostComment(postId),
        cachedGetUserInfo(session.id!, postUserParam)
    ]);

    console.log("User >> ", userProfile);

    return (
        <PostDetailHTML             
            post={post}
            likeCount={likeCount}
            isLiked={isLiked}
            postId={postId}
            userProfile={userProfile}
            comments={comments}
        />
    )
}

interface userParamInterface {
    "id": true,
    "avatar": true,
    "username": true,
}

export type PostUserInfo = Pick<User, keyof userParamInterface>