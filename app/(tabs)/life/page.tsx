import { cachedGetPosts } from "@/api/posts/cachedAPI";
import { formatToTimeAgo } from "@/lib/utils";
import { ChatBubbleBottomCenterIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export const metadata = {
    title: "동네 생활"
};

export default async function Life() 
{
    const posts = await cachedGetPosts();
    
    return (
        <div className="p-5 flex flex-col border border-white min-h-svh relative">
            {posts.map((post) => (
                <Link
                    key={post.id}
                    href={`/posts/${post.id}`}
                    className="
                        pb-5 mb-5 border-b border-neutral-500 text-neutral-400 
                        flex  flex-col gap-2 last:pb-0 last:border-b-0
                    "
                >
                    <h2 className="text-white text-lg font-semibold">{post.title}</h2>
                    <p>{post.description}</p>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex gap-4 items-center">
                            <span>{formatToTimeAgo(post.created_at.toString())}</span>
                            <span>·</span>
                            <span>조회 {post.views}</span>
                        </div>
                        <div className="flex gap-4 items-center *:flex *:gap-1 *:items-center">
                            <span>
                                <HandThumbUpIcon className="size-4" />
                                {post._count.likes}
                            </span>
                            <span>
                                <ChatBubbleBottomCenterIcon className="size-4" />
                                {post._count.comments}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
            <div className="p-10 invisible"> test </div>
            <Link
                href={"lifes/add"} 
                className="
                    w-20 h-20 border border-white rounded-full
                    sticky bottom-32 place-self-end
                    flex items-center justify-center
                    bg-orange-500 
                    hover:cursor-pointer hover:bg-orange-400
                "
            > 
                <PlusIcon className="size-10 text-white"/>
            </Link>
        </div>
      );
}