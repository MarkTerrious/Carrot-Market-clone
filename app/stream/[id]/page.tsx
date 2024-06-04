import { getStream } from "@/api/streams/streamAPI";
import { getSession } from "@/lib/session";
import { PromiseReturnType } from "@prisma/client/extension";
import { notFound } from "next/navigation";
import LiveStreamingHtml from "./pageHtml";

export default async function LiveStreaming({
    params 
} : { 
    params: { id: string }
}) {
    const liveId = Number(params.id);
    if( isNaN(liveId) ) {
        return notFound();
    }

    const stream = await getStream(liveId);
    if (!stream) {
        return notFound();
    }

    const session = await getSession();
    
    return (
        <LiveStreamingHtml stream={stream} userId={session.id!} />
    )

}

export type LiveStreamType = PromiseReturnType<typeof getStream>