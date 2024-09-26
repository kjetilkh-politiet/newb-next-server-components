import "server-only";
import Users from "@/src/components/Users";
import UserAddClient from "@/src/components/UserAdd.client";

export default function Home() {
  return (
    <section className="grid gap-10">
      <Users />
      <UserAddClient />
    </section>
  );
}
