"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { Prisma } from "@prisma/client";

export async function getRoom(id: string) {
    const room = await db.chatRoom.findUnique({
        where: {
            id,
        },
        include: {
            users: {
                select: { id: true },
            },
        },
    });
    if (room) {
        const session = await getSession();
        const canSee = Boolean(room.users.find((user) => user.id === session.id!));
        if (!canSee) {
            return null;
        }
    }
    return room;
}

export async function getMessages(chatRoomId: string) {
    const messages = await db.message.findMany({
        where: {
            chatRoomId,
        },
        select: {
            id: true,
            payload: true,
            created_at: true,
            userId: true,
            user: {
                select: {
                    avatar: true,
                    username: true,
                },
            },
        },
    });

    return messages;
}

export async function uploadMessage({
    payload,
    chatRoomId,
    userId,
} : {
    payload: string
    chatRoomId: string
    userId: number
}) 
{
    try {
        console.log("Loaded in SERVER");
        await db.message.create({
            data: {
                payload: payload,
                chatRoomId: chatRoomId,
                userId: userId 
            },    
        });
    } catch( e ) {
        console.log("ERR >> ", e);
    } 
}

export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;