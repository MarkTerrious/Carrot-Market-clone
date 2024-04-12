import { Prisma, PrismaClient } from "@prisma/client";

const db = new PrismaClient();

// async function Test() {
//     const token = await db.sMSToken.findUnique({
//         where: {
//             id:1,
//         },
//         include: {
//             user: true
//         }
//     })
//     console.log("Test Token >> ", token);
// }

// Test();

export default db;
