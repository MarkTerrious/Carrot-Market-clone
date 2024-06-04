import { notFound } from "next/navigation";
import { getMessages, getRoom } from "./action";
import { getSession } from "@/lib/session";
import ChatMessagesList from "./pageHTML";
import { getUserInfo } from "@/api/user/userAPI";

export default async function ChatRoom(
    { params }: { params: { id: string } }
) {
    // params id = cuid()
    const room = await getRoom(params.id);
    if (!room) {
      return notFound();
    }

    const initialMessages = await getMessages(params.id);
    const session = await getSession();
    const user = await getUserInfo(session.id!, {
      username: true,
      avatar: true,
    });

    if(!(session.id || user)) {
      return notFound();
    } 

    const defaultImg = "/Toast.png"

    return (
        <ChatMessagesList 
          chatRoomId={params.id} 
          username={user?.username!}
          avatar={user?.avatar!}
          userId={session.id!} 
          initialMessages={initialMessages} 
          defaultImg={defaultImg}
        />
    );
  }