import db from "@/lib/db"
import { getSession } from "@/lib/session"
import { notFound, redirect } from "next/navigation";

async function getUser() {
    const session = await getSession();
    if(session.id) {
        const user = db.user.findUnique({
            where: {
                id: session.id,
            },
            select: {
                username: true,
            }
        });
        if(user) {
            return user;
        }
    }
    notFound();
}

export default async function Profile() {
    const user = await getUser();
    const onLogout = async () => {
        "use server"
        const session = await getSession();
        session.destroy();
        redirect("/");
    }

    console.log("Profile");
    return (
        <div>
            <h1>Welcome! {user?.username}</h1>
            <form action={onLogout}>
                <button>Log out</button>
            </form>
        </div>
    )
}