import ButtonLink from "@/components/button-link-staff";
import { getServerAuthSession } from "@/lib/auth";
import { getEntity } from "@/lib/entity";
import CreateStaffForm from "./form";

export default async function CreateStaff() {
	const session = await getServerAuthSession();
	const token = session?.user.accessToken;
	const entity = await getEntity(token as string);

	return (
		<>
			<ButtonLink />
			<CreateStaffForm token={token as string} entity={entity} />
		</>
	);
}
