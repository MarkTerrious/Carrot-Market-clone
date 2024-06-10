"use client";

import { useEffect, useState } from "react";
import { streamingTest } from "./action";

export default function TestHtml()
{
    const [socket,setSocket] = useState<WebSocket>();
    const onStream = () => {
       socket?.send("CLIENT SEND");
    }

    useEffect(() => {
        if ( !socket ) {
            setSocket(new WebSocket("ws://localhost:8080/test"));
        } else {
            socket.addEventListener("open", (event) => {
                console.log("서버와 연결을 맺었습니다.");
            });

            socket.addEventListener("message", (event) => {
                console.log("서버에서 받은 메시지:", event.data);
            });

            socket.addEventListener("error", (event) => {
                console.error("에러:", event);
            });

            socket.addEventListener("close", (event) => {
                console.log("서버와 연결을 끊었습니다.");
            });
        }
    }, [socket])


    return (
        <div onClick={onStream}>
            Test
        </div>
    )
}