import { Sessions } from "types/Session";

export default function getUserRole(session: Sessions | undefined): string {
  const role = session?.data?.data?.user_role?.role ?? "No Roles";

  return role;
}
