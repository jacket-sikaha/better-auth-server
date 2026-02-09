"use client";
import { authClient, TOKEN_KEY, validateSession } from "@/lib/auth-client";
import { validateToken } from "@/lib/token";
import { Button } from "antd";
import { redirect } from "next/navigation";
import { useEffect } from "react";

function Dashboard() {
  const { data: session } = authClient.useSession();
  useEffect(() => {
    validateToken(localStorage.getItem(TOKEN_KEY) || "")
      .then((result) => {
        console.log("res00:", result);
      })
      .catch((err) => {});
  }, []);
  if (!session) {
    return (
      <div className=" h-svh flex flex-col items-center justify-center gap-4">
        未认证
        <Button onClick={() => redirect("/")}> 去登录</Button>
      </div>
    );
  }

  return (
    <div className=" h-svh flex flex-col items-center justify-center gap-4">
      <h1>欢迎 {session.user.name}</h1>
      <div
        onClick={async () => {
          const res = await validateSession();
          console.log("res00:", res);
        }}
      >
        校验session 是否有效
      </div>
      <div
        onClick={async () => {
          const res = await validateToken(
            localStorage.getItem(TOKEN_KEY) || "",
          );
          console.log("res00:", res);
        }}
      >
        校验jwt 是否有效
      </div>
      <Button
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess: () => {
                redirect("/"); // 重定向到登录页面
              },
            },
          })
        }
      >
        退出登录
      </Button>
    </div>
  );
}

export default Dashboard;
