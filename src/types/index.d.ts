import { PrismaClient } from "@prisma/client";

declare global {
  var prismaClient: PrismaClient | undefined;
}
// 👇 关键！必须加这一行，否则声明不生效
export {};
