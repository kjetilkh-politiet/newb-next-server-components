"use server";

import { db } from "@/src/server/drizzle";
import { user } from "@/src/server/schema";
import { CacheTags } from "@/src/shared/cache.shared";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const zCreateUser = z.object({
	firstName: z.string().min(3),
	lastName: z.string().min(3),
	email: z.string().email(),
});

type ActionResult =
	| {
			status: "success";
			message: string;
	  }
	| {
			status: "error";
			message: string;
	  };

export async function addUser(
	previousState: ActionResult | null,
	formData: FormData,
): Promise<ActionResult> {
	try {
		const formDataObject = Object.fromEntries(formData);
		console.log("Form data object", formDataObject);

		const parseResult = zCreateUser.safeParse(formDataObject);
		if (!parseResult.success) {
			console.log("Parse user error", parseResult.error);
			return {
				status: "error",
				message:
					"Fornavn, etternavn og e-post må oppgis i gyldig format.",
			} as const;
		}

		const result = await db.insert(user).values(parseResult.data);
		if (result[0].affectedRows > 0) {
			revalidateTag(CacheTags.users);
			return {
				status: "success",
				message: "Bruker lagt til.",
			} as const;
		}

		return {
			status: "error",
			message: "Ingen bruker ble opprettet av en eller annen grunn.",
		} as const;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.log("Error when creating user: ", e);

		return {
			status: "error",
			message: `En feil oppstod ved opprettelse av bruker.`,
		} as const;
	}
}

export async function deleteUser(userId: number): Promise<ActionResult> {
	try {
		const result = await db.delete(user).where(eq(user.id, userId));
		if (result[0].affectedRows > 0) {
			revalidateTag(CacheTags.users);
			return {
				status: "success",
				message: "Bruker slettet.",
			} as const;
		}

		return {
			status: "error",
			message: "Ingen brukere ble slettet av en eller annen grunn.",
		} as const;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
	} catch (e) {
		console.log("Error when deleting user: ", e);

		return {
			status: "error",
			message: `En feil oppstod ved sletting av bruker.`,
		} as const;
	}
}
