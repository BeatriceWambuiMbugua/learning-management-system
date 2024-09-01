import { PrismaClient } from '@prisma/client'
import { withOptimize } from "@prisma/extension-optimize";

const prisma = new PrismaClient().$extends(withOptimize());
const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prismadb = globalThis.prismaGlobal ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prismadb

