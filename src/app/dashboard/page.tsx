import { auth } from "@/auth";
import { headers } from "next/headers";

async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>未认证</div>;
  }
  return (
    <div>
      <h1>欢迎 {session.user.name}</h1>
    </div>
  );
}

export default Dashboard;
