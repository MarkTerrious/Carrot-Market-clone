"use client";

import { ChangeEvent,  ForwardedRef, MouseEvent,  forwardRef, startTransition } from "react"

interface CommentInputBoxProps {
    id : number,
    action?: (...args: any) => any
}

let timeout:any = null;
export function CommentInputBox(
    {
        id,
        action
    } : CommentInputBoxProps, 
    ref: ForwardedRef<HTMLInputElement>
) {

    const onAddComment = (e:MouseEvent<HTMLButtonElement>) => {
        console.log("ADD Comment!");    
    }

    return (
        <div className="
                border-t border-b border-gray-200
                p-2 flex flex-col gap-1
            "
        >
            <span className=""> 댓글 </span>
            <div className="
                    flex flex-col w-full gap-2
                "
            >
                <form
                    className="
                        flex flex-row flex-wrap
                        w-full gap-2 *:transition
                    "
                    action={action}
                >       
                    <input 
                        ref={ref}
                        name="comment"
                        className="
                            flex-grow text-black rounded-md
                            hover:ring-2 hover:ring-orange-500
                            border-none focus:ring-4 focus:ring-orange-500
                        "                     
                        />
                    <button 
                        key={id}
                        className="
                            flex-grow border border-red-300 rounded-md
                            hover:bg-orange-500 
                            hover:ring-4 hover:ring-orange-500 hover:ring-opacity-50
                            hover:font-semibold
                        "
                        onClick={onAddComment}
                    >
                        등록하기
                    </button>
                </form>
            </div>
        </div>
    )
}

export default forwardRef(CommentInputBox);