import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

interface sessionData {
    id: number,
    rUrl?: string | undefined | null,   // relative
}

export async function saveSessionData({id, rUrl}:sessionData) 
{
    const session = await getSession();
    session.id = id
    await session.save();

    if(rUrl) redirect(rUrl);    
}

export type SESSION_ID_TYPE = number;