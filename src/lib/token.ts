import dayjs from "dayjs";
import { jwtVerify, createLocalJWKSet } from "jose";
import { authClient } from "./auth-client";

export async function validateToken(token: string) {
  try {
    /**
     * 这是从 /api/auth/jwks 端点
     * 获取的 JWKS
     */
    const storedJWKS = await fetch("/api/auth/jwks");
    const JWKS = createLocalJWKSet({
      keys: (await storedJWKS.json())?.keys!,
    });
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: process.env.BASE_URL, // 应与您的 JWT 签发者匹配，即 BASE_URL
      audience: process.env.BASE_URL, // 应与您的 JWT 受众匹配，默认为 BASE_URL
    });
    payload.exp
      ? console.log(dayjs.unix(payload.exp).format())
      : console.log("No exp found");
    return payload;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw error;
  }
}

export async function verifyOneTimeToken(token: string) {
  try {
    const result = await authClient.oneTimeToken.verify({
      token, // required
    });
    return result;
  } catch (error) {
    console.error("One-time token verification failed:", error);
    throw error;
  }
}
