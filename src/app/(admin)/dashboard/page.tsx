import { getServerSession } from "next-auth";

export default async function DashboardPage() {
  const session = await getServerSession();
  return <div>{session?.user.email}</div>;
}
