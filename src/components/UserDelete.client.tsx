"use client";

import { deleteUser } from "@/actions/user";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function UserDeleteClient({ userId }: { userId: number }) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <span>
      <button
        type="button"
        onClick={() => {
          startTransition(async () => {
            const result = await deleteUser(userId);
            if (result.status === "success") {
              router.refresh();
            }
            if (result.status === "error") {
              setErrorMessage(result.message);
            }
          });
        }}
        className="rounded py-1 px-2 bg-red-800"
      >
        Slett
      </button>
      {errorMessage != "" ? (
        <span className="text-red-300">{errorMessage}</span>
      ) : (
        <></>
      )}
    </span>
  );
}
