import "server-only";
import { db } from "../drizzle";

export default async function Users() {
  const users = await db.query.user.findMany();
  return (
    <section>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Fornavn</td>
            <td>Etternavn</td>
            <td>E-post</td>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.email}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}
