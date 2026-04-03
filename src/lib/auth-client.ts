import { createAuthClient } from "better-auth/react";
import { oneTimeTokenClient } from "better-auth/client/plugins";
import dayjs from "dayjs";

export const TOKEN_KEY = "bearer_token";
export const authClient = createAuthClient({
  plugins: [oneTimeTokenClient()],
  /** 服务器的基本 URL（如果使用相同域名则为可选） */
  baseURL: "http://localhost:3000",
  fetchOptions: {
    onSuccess: (ctx) => {
      const authToken = ctx.response.headers.get("set-auth-jwt"); // 从响应头获取令牌
      // 安全地存储令牌（例如在 localStorage 中）
      if (authToken) {
        localStorage.setItem(TOKEN_KEY, authToken);
      }
    },
  },
});

// 封装会话验证函数
export async function validateSession() {
  // 1. 查询会话
  const { data } = await authClient.getSession();

  if (!data?.session) {
    return { valid: false, reason: "会话不存在" };
  }

  // 2. 检查是否过期（核心：手动判断过期时间）
  const isExpired = dayjs(data?.session.expiresAt || "").isBefore(dayjs());
  if (isExpired) {
    // 3. 过期则删除session记录
    // await authClient.revokeSession({
    //   token: data?.session.token,
    // });
    return { valid: false, reason: "会话已过期" };
  }

  return { valid: true, data };
}
