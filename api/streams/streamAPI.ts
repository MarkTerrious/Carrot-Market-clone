import db from "@/lib/db";

export async function getStream(id: number) 
{
    const stream = db.liveStream.findUnique({
        where: {
            id,
        },
        select: {
            title: true,
            stream_key: true,
            stream_id: true,
            userId: true,
            user: {
                select: {
                    avatar: true,
                    username: true,
                }
            }
        }
    });

    return stream;
}