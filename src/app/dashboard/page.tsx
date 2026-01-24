import { auth } from "@/auth";
import { Button } from "antd";
import { headers } from "next/headers";

async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>未认证</div>;
  }
  console.log("session:", session);
  return (
    <div className=" h-svh flex flex-col items-center justify-center gap-4">
      <h1>欢迎 {session.user.name}</h1>
      <Button
        onClick={async () =>
          auth.api.signOut({
            // This endpoint requires session cookies.
            headers: await headers(),
          })
        }
      >
        退出登录
      </Button>
    </div>
  );
}

export default Dashboard;
