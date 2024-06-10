"use server";

import fs from "fs";
import { IncomingMessage } from "http";
import{ WebSocketServer }from "ws";

let count = 0;
let ws:WebSocketServer | null =  null;
console.log("실험");

export async function streamingTest()
{   
    console.log("COUNT : ", count);
    count+=1;
    if(!ws) {
        console.log("new connection ?");
        try {
            ws = new WebSocketServer({ port: 8080 }); 
            
            // fs.writeFileSync("./socket", , )
            ws.on("connection", (socket, request:IncomingMessage) => {
                console.log("클라이언트가 접속하였습니다. >> ");
                const ip = request.headers["x-forwarded-for"] || request.connection.remoteAddress

                console.log("ip >> ", ip);
                if ( socket.readyState === socket.OPEN ) {
                    socket.send(`클라이언트 [${ip}] 접속을 환영합니다.`);
                }

                socket.on("message", (message) => {
                    console.log("받은 메세지 > ", message.toString());
                    socket.send("메세지 잘 받았습니다!");
                });
          
                socket.on("close", () => {
                    console.log("클라이언트가 접속을 끊었습니다.");
                });
            });
            
            // ws.close();
        } catch( e ) {
            console.log("ERR >> ", e);
        } 
    } else {
        console.log("Socket Already Exist! ");
    }

    
}
