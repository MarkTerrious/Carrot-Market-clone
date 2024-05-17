export const revalidate_post = "revalidate-post";
export const revalidate_like_stat = (postId:number) => {
    return `revalidate-like-status-${postId}`
};

