"use client";

import { addUser } from "@/actions/user";
import { useActionState, useEffect, useState } from "react";

export default function UserAddClient() {
	const [state, formAction] = useActionState(addUser, null);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");

	useEffect(() => {
		if (state?.status === "success") {
			// reset form
			setFirstName("");
			setLastName("");
			setEmail("");
		}
	}, [state?.status]);

	return (
		<form className="grid gap-6" action={formAction}>
			<h2 className="text-2xl">Ny bruker</h2>
			<fieldset className="grid gap-4">
				<div>
					<label>
						Fornavn:
						<input
							type="input"
							name="firstName"
							className="ml-2"
							value={firstName}
							onChange={(ev) => setFirstName(ev.target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						Etternavn:
						<input
							type="input"
							name="lastName"
							className="ml-2"
							value={lastName}
							onChange={(ev) => setLastName(ev.target.value)}
						/>
					</label>
				</div>
				<div>
					<label>
						E-post:
						<input
							type="email"
							name="email"
							className="ml-2"
							value={email}
							onChange={(ev) => setEmail(ev.target.value)}
						/>
					</label>
				</div>
			</fieldset>
			<section className="grid gap-2">
				<button
					type="submit"
					className="rounded bg-green-800 py-1 px-3 hover:bg-green-700"
				>
					Legg til bruker
				</button>
				{state?.status === "success" && (
					<p className="text-green-300">{state.message}</p>
				)}
				{state?.status === "error" && (
					<p className="text-red-300">{state.message}</p>
				)}
			</section>
		</form>
	);
}
