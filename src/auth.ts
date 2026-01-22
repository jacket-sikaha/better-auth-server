import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// 如果您的 Prisma 文件位于其他位置，可以更改路径
import { prismaClient } from "../lib/prisma";
import { sendCheckinEMail } from "./lib/email";

export const auth = betterAuth({
  database: prismaAdapter(prismaClient, {
    provider: "sqlite", // 或 "mysql", "postgresql", ...等
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }, request) => {
      await sendCheckinEMail(
        user.email,
        "验证您的邮箱地址",
        `请点击链接验证您的邮箱：${url}`,
      );
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});
