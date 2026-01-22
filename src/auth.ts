import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// 如果您的 Prisma 文件位于其他位置，可以更改路径
import { prismaClient } from "../lib/prisma";
import { sendCheckinEMail } from "./lib/email";
import { redirect } from "next/navigation";

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, {
    provider: "sqlite", // 或 "mysql", "postgresql", ...等
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      await sendCheckinEMail(
        user.email,
        "重置您的密码",
        `请点击链接重置密码：${url}`,
      );
    },
    onPasswordReset: async ({ user }, request) => {
      // 在此处添加你的逻辑
      console.log(`用户 ${user.email} 的密码已重置。`);
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendCheckinEMail(
        user.email,
        "验证您的邮箱地址",
        `请点击链接验证您的邮箱：${url}`,
      );
    },
    autoSignInAfterVerification: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 缓存持续时间，单位为秒
    },
  },
});
