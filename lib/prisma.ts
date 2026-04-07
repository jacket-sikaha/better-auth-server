import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

// const sqliteAdapter  = new PrismaBetterSqlite3({ url: connectionString });
const pgAdapter = new PrismaPg({ connectionString });

// 全局单例，防止热重载创建多个实例
let prismaClient: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaClient = new PrismaClient({ adapter: pgAdapter });
} else {
  // 开发环境：挂载到 global，避免重复实例化
  if (!global.prismaClient) {
    global.prismaClient = new PrismaClient({ adapter: pgAdapter });
  }
  prismaClient = global.prismaClient;
}
export { prismaClient };
