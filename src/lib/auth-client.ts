import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  /** 服务器的基本 URL（如果使用相同域名则为可选） */
  baseURL: "http://localhost:3000",
});
