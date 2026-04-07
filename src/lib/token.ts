import dayjs from "dayjs";
import { jwtVerify, createLocalJWKSet, createRemoteJWKSet } from "jose";
import { authClient } from "./auth-client";
import { JWTExpired } from "jose/errors";

export async function validateJWTToken(token: string) {
  try {
    //     浏览器端：可以用 /api/xxx
    // 服务端：必须用完整地址 http://域名/api/xxx
    const JWKS = createRemoteJWKSet(
      new URL("/api/auth/jwks", process.env.NEXT_PUBLIC_BETTER_AUTH_URL),
    );
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // 应与您的 JWT 签发者匹配，即 BASE_URL
      audience: process.env.NEXT_PUBLIC_BETTER_AUTH_URL, // 应与您的 JWT 受众匹配，默认为 BASE_URL
    });
    return payload;
  } catch (error: any) {
    console.error("Token validation failed:", error.message);
    if (error instanceof JWTExpired) {
      return null;
    }
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
