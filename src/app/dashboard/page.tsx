"use client";
import { authClient, TOKEN_KEY, validateSession } from "@/lib/auth-client";
import { validateJWTToken, verifyOneTimeToken } from "@/lib/token";
import { Button } from "antd";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function Dashboard() {
  const { data: session } = authClient.useSession();
  const [token, setToken] = useState("");
  const [jwtToken, setJwtToken] = useState("");

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
      <div
        onClick={async () => {
          const res = await validateSession();
          console.log("res00:", res);
        }}
      >
        校验session 是否有效
      </div>
      <div
        className="w-64"
        onClick={() => {
          authClient?.getSession({
            fetchOptions: {
              onSuccess: (ctx) => {
                const jwt = ctx.response.headers.get("set-auth-jwt");
                setJwtToken(jwt || "");
              },
            },
          });
        }}
      >
        当前jwt: {jwtToken}
      </div>
      <div
        onClick={async () => {
          const res = await fetch("/api/token/verify", {
            method: "POST",
            body: JSON.stringify({ token: jwtToken }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const data = await res.json();
          console.log("校验jwt 是否有效:", data);
        }}
      >
        校验jwt 是否有效
      </div>
      <div
        className="w-64"
        onClick={() => {
          authClient.oneTimeToken.generate().then((res) => {
            console.log("res:", res);
            setToken(res.data?.token || "");
            console.log("oneTimeToken:", res.data?.token);
          });
        }}
      >
        重新生成oneTimeToken: {token}
      </div>
      <div
        onClick={async () => {
          const result = await verifyOneTimeToken(token);
          console.log("result:", result);
        }}
      >
        校验oneTimeToken 是否有效
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
