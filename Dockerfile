# Stage 1: 使用官方 Node.js 作为构建环境
FROM node:alpine

WORKDIR /app

# 依赖缓存
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 生成 Prisma 客户端
RUN pnpm prisma:generate

# 将项目源代码复制到工作目录
COPY . .

# 构建项目，假设所有的源代码都在 src 目录下
RUN pnpm build

# 暴露端口（Next.js 默认端口为 3000）
EXPOSE 3000

# 使用 pnpm start 来启动应用
CMD ["pnpm", "start"]
