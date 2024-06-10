export const revalidate_post = (postId:number) => {
    return `revalidate-post-${postId}`
}

export const revalidate_post_comment = (postId:number) => {
    return `revalidate-post-comment-${postId}`
}

export const revalidate_like_stat = (postId:number) => {
    return `revalidate-like-status-${postId}`
};

export const revalidate_posts_whole = () => {
    return `revalidate-posts-whole`
}
