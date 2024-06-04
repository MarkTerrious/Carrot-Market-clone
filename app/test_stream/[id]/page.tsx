import { getSession } from "@/lib/session";
import { notFound } from "next/navigation";

export async function TestStream({
    params
} : {
    params: { id: string }
})
{
    const streamId = Number(params.id);
    if(isNaN(streamId)) {
        return notFound();
    }
    const session = await getSession();

}