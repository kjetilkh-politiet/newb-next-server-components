import "server-only";
import { getCachedUsers } from "../server/user";
import UserDeleteClient from "./UserDelete.client";

export default async function Users() {
	const users = await getCachedUsers();
	return (
		<section>
			<table className="data-table">
				<thead>
					<tr>
						<td>ID</td>
						<td>Fornavn</td>
						<td>Etternavn</td>
						<td>E-post</td>
						<td></td>
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
								<td>
									<UserDeleteClient userId={user.id} />
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</section>
	);
}
