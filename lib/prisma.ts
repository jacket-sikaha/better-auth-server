import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

// const sqliteAdapter  = new PrismaBetterSqlite3({ url: connectionString });
const pgAdapter = new PrismaPg({ connectionString });
const prismaClient = new PrismaClient({ adapter: pgAdapter });

export { prismaClient };
