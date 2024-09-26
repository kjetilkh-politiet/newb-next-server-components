import { db } from "./drizzle";

export async function getUsers() {
  return await db.query.user.findMany({
    columns: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
    },
  });
}
