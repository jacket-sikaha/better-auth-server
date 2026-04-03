"use client";
import { authClient } from "@/lib/auth-client";
import { Button } from "antd";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";

function Result() {
  const { data: session } = authClient.useSession();
  const redirectURL = localStorage.getItem("redirectURL");

  useEffect(() => {
    if (redirectURL) {
      setTimeout(async () => {
        const res = await fetch("/api/auth/token", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        return redirect(redirectURL + "?token=" + data.token);
      }, 3000);
    }
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
    <div className="h-svh flex flex-col items-center justify-center gap-4">
      <h1>欢迎 {session.user.name}</h1>
      <p>3s 后跳转到 {redirectURL}</p>
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

export default Result;
