
/**
 * getPost에서 update try, catch 문 쓰는 이유 >>
postId가 없으면 에러 발생시킨다. 
보고있는 중에 게시글 원작자가 게시글을 삭제할 수 있다.
프로그램 동작 에러를 일으키고 해커가 이를 이용할 수 있다.
* getPost에서 like를 안들고 오는 이유 >>
안들고 와도 되는 중복 쿼리를 요청 하기 때문.
*/

"use server";
import db from "@/lib/db";

export async function getPost(postId: number)
{
    try { 
        const post = db.post.update({
            where: {
                id: postId
            },
            data: {
                views: {
                    increment: 1,
                }
            },
            include: {
                user: {
                    select: {
                        username: true,
                        avatar: true,
                    }
                },
                _count: {
                    select: { 
                        comments: true,
                    }
                }
            }
        })

        return post;
    } catch( e ) {
        return null;
    }
}

export async function getPosts() {
    const posts = db.post.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            views: true,
            created_at: true,
            _count: {
                select: {
                    comments: true,
                    likes: true
                }
            }
        }
    });

    return posts;
}

export async function getLikeStatus(postId: number, userId: number) 
{
    const likeCount = db.like.count({
        where: {
            postId: postId
        },
    });

    const likeStatus = await db.like.findUnique({
        where: {
            likeId: {
                postId,
                userId
            }
        }
    });
    
    const result = await Promise.all([likeCount, likeStatus]);
    
    return {
        likeCount: result[0],
        isLiked: Boolean(result[1])
    };
}

export async function getPostComment(postId: number) 
{
    const comments = db.comment.findMany({
        where: {
            postId
        },
        select: {
            id: true,
            postId: true,
            payload: true,
            created_at: true,
            user: {
                select: {
                    username: true,
                    avatar: true,
                },
            }
        }
    })

    return comments;
}