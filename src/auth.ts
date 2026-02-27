import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// 如果您的 Prisma 文件位于其他位置，可以更改路径
import { prismaClient } from "../lib/prisma";
import { sendCheckinEMail } from "./lib/email";
import { bearer, customSession, jwt } from "better-auth/plugins";
import dayjs from "dayjs";

export const auth = betterAuth({
  plugins: [
    customSession(async ({ user, session }) => {
      // 自定义会话过期时间（下面session的expiresIn 配置无效）
      session.expiresAt = dayjs(session.createdAt).add(10, "minute").toDate();
      return {
        user,
        session,
      };
    }),
    jwt({
      jwt: {},
    }),
    bearer(),
  ],

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
    disableSessionRefresh: true,
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 缓存持续时间，单位为秒
    },
    logger: {
      disabled: false,
      level: "warn",
      log: (level: string, message: string, ...args: any) => {
        // 自定义日志记录实现
        console.log(`[${level}] ${message}`, ...args);
      },
    },
  },
});
