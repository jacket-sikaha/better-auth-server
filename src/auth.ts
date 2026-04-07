import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// 如果您的 Prisma 文件位于其他位置，可以更改路径
import { jwt, oneTimeToken, openAPI } from "better-auth/plugins";
import { prismaClient } from "../lib/prisma";
import { sendCheckinEMail } from "./lib/email";

export const auth = betterAuth({
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:5173", // 👈 必须加这个
    // "*.example.com",             // 信任 example.com 的所有子域名
    // "https://*.example.com",     // 仅信任 HTTPS 子域名
    // "http://*.dev.example.com"   // 信任 dev.example.com 的 HTTP 子域名
  ],

  plugins: [
    jwt({
      jwt: {
        expirationTime: "30min",
      },
    }),
    openAPI(),
    oneTimeToken(),
  ],

  database: prismaAdapter(prismaClient, {
    // provider: "sqlite", // 或 "mysql", "postgresql", ...等
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
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

  cookiePrefix: "sikara-test",

  session: {
    disableSessionRefresh: true,
    expiresIn: 60 * 60 * 24 * 7, // 7 天
    freshAge: 60 * 4, // 会话新鲜度年龄，单位为秒
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
