"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChats = getChats;
const index_js_1 = require("../index.js");
const schema_js_1 = require("../schema.js");
// export async function createUser(user: NewUser) {
//     const [result] = await db
//         .insert(users)
//         .values(user)
//         .onConflictDoNothing()
//         .returning();
//     return result;
// }
// export async function reset() {
//     await db.delete(users);
// }
// export async function getUserByEmail(email: string) {
//     const [result] = await db
//         .select()
//         .from(users)
//         .where(eq(users.email, email));
//     return result;
// }
async function getChats() {
    return index_js_1.db.select().from(schema_js_1.chats);
}
// export async function updateUser(
//     id: string,
//     email: string,
//     hashedPassword: string
// ) {
//     const [result] = await db
//         .update(users)
//         .set({
//             email: email,
//             hashedPassword: hashedPassword
//         })
//         .where(eq(users.id, id))
//         .returning();
//     return result;
// }
// export async function upgradeChirpyRed(id: string) {
//     const [result] = await db
//         .update(users)
//         .set({
//             isChirpyRed: true
//         })
//         .where(eq(users.id, id))
//         .returning();
//     return result;
// }
