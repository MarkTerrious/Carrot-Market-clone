"use client";

import { formatToTimeAgo } from "@/lib/utils";
import { ArrowUpCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { InitialChatMessages, uploadMessage } from "./action";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";

interface ChatMessageListProps {
    initialMessages: Partial<InitialChatMessages>;
    username: string;
    avatar: string;
    userId: number;
    chatRoomId: string;
    defaultImg: string;
}

const client = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!
);

async function saveMessage({
    chatRoomId, 
    message, 
    userId
} : {
    chatRoomId: string,
    message: string,
    userId: number
}) {
    await uploadMessage({ 
        chatRoomId,
        payload: message,
        userId
    }).then(() => {
        console.log("message done!");
    })
}

export default function ChatMessagesList(
{
    initialMessages,
    username,
    avatar,
    userId,
    chatRoomId, 
    defaultImg,
}: ChatMessageListProps
) {  
    const [messages, setMessages] = useState(initialMessages);  // Room's Message
    const [message, setMessage] = useState(""); // My message
    const channel = useRef<RealtimeChannel>();
    const scrollRef = useRef<HTMLDivElement>(null);

    /**
     * @name onChange
     * @param event ChangeEvent e
     * @description : 
            
     */
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { value },
        } = event;
        setMessage(value);
    };

    const onSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // 새로고침 x
        setMessages((prevMsg) => [
            ...prevMsg,
            {
                id: Date.now(),
                payload: message,
                created_at: new Date(),
                userId,
                user: {
                    avatar: "xxx",
                    username: "xxx"
                }
            }
        ])
        saveMessage({
            chatRoomId,
            message,
            userId
        });
        setMessage("");
        channel.current?.send({
            type: "broadcast",
            event: "message",
            payload: { 
                id: Date.now(),
                userId: userId,
                payload: message,
                created_at: new Date(),
                user: {
                    username: username,
                    avatar: avatar,
                }
            }
        });
       
    };   

    useEffect(() => {
        channel.current = client.channel(`room-${chatRoomId}`);
        channel.current
        .on(
            "broadcast",
            { event: "message" },
            (payload) => {
                console.log("BROADCASRT ", payload);
                setMessages((prevMsg) => {
                    return  [...prevMsg, payload.payload]
                });
            }
        )
        .subscribe();

        return () => {
            channel.current?.unsubscribe();
        }
    }, [chatRoomId])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }

    }, [messages])

    return (
      <div className="p-5 flex flex-col gap-5 min-h-screen justify-end">
            {messages.map((message) => (
                // 말풍선 레이아웃 위치 : 상대방 = 왼쪽, 자신 = 오른쪽
                <div 
                    key={message?.id}
                    className={`
                        flex gap-2 items-start 
                        ${message?.userId === userId ? "justify-end" : ""}
                    `}
                >
                    {
                        // 메세지가 자기 자신이면 아바타 표시 x 
                        message?.userId === userId 
                        ? null 
                        : (
                            <Image
                                src={message?.user?.avatar || defaultImg}
                                alt={message?.user.username!}
                                width={50}
                                height={50}
                                className="size-8 rounded-full"
                                priority
                            />
                        )
                    }
                    {/* 메세지 안에서 내용을 자신이면 오른쪽, 상대면 왼쪽 위치  */}
                    <div
                        className={`
                            flex flex-col gap-1 
                            ${ message?.userId === userId ? "items-end" : "" }
                        `}
                        >
                        {/* 자기 자신과 상대방 말풍선 색 */}
                        <span
                            className={`
                                ${ 
                                    message?.userId === userId 
                                    ? "bg-blue-500" 
                                    : "bg-sky-500"
                                } 
                                p-2.5 rounded-md
                            `}
                        >
                            {message?.payload}
                        </span>
                        <span className="text-xs">
                            {formatToTimeAgo(message!.created_at.toString())}
                        </span>
                    </div>
                    <div ref={scrollRef}/>
                </div>
            ))}
           
            <form className="flex relative" onSubmit={onSubmit}>
                <input
                    required
                    onChange={onChange}
                    value={message}
                    className="
                        bg-transparent rounded-full w-full h-10 
                        focus:outline-none px-5 ring-2 focus:ring-4 
                        transition ring-neutral-200 focus:ring-neutral-50 
                        border-none placeholder:text-neutral-400
                    "
                    type="text"
                    name="message"
                    placeholder="Write a message..."
                />
                <button className="absolute right-0">
                    <ArrowUpCircleIcon className="size-10 text-orange-500 transition-colors hover:text-orange-300" />
                </button>
            </form>
        </div>
    );
  }