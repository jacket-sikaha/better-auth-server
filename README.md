# better-auth-server

**View English Documentation**: [README_EN.md](README_EN.md)

[![DeepWiki Index](https://deepwiki.com/badge.svg)](https://deepwiki.com/jacket-sikaha/FRP-UI)

<div align="center">
  <a href="https://github.com/sikaha/FRP-UI">
    <img src="https://raw.githubusercontent.com/fatedier/frp/master/docs/_static/logo.png" alt="FRP Logo" height="80">
  </a>
  <p>
    <b>better-auth-server</b>
  </p>
</div>

## 📋 项目概述

---

## 🚀 主要功能

- ✅ Docker容器化部署

## 🛠️ 技术栈

| 技术/框架    | 版本    | 用途           |
| ------------ | ------- | -------------- |
| Next.js      | ^15.5.2 | React框架      |
| React        | ^19.1.0 | UI库           |
| Ant Design   | ^5.27.1 | UI组件库       |
| TypeScript   | ^5      | 类型系统       |
| Tailwind CSS | ^4      | 样式框架       |
| smol-toml    | 1.4.2   | TOML配置解析   |
| react-query  | 3.39.3  | 数据请求管理   |
| immer        | 10.1.3  | 不可变数据管理 |

## 📦 安装与部署

### Docker部署（推荐）

```bash
docker-compose up -d
```

### Docker Compose配置示例

```yaml
version: "3.8"

services:
  frp-ui:
    image: docker.io/sikaha/frp-ui:latest
    container_name: frp-ui
    ports:
      - "3000:3000"
    environment:
      - ORIGIN_SERVER=http://localhost:3000 # FRP服务器API地址
      - AUTH_SECRET=your-secret # 替换为实际的AUTH_SECRET
    restart: unless-stopped
    networks:
      - frp-network

networks:
  frp-network:
    driver: bridge
```

### 本地开发

```bash
# 安装依赖
pnpm install

# 生成认证密钥
pnpm auth

# 如果是第一次运行，用prisma的话

# 初始化数据库 生成schema.prisma文件
pnpm prisma:init
# 生成prismaClient所需要的文件
pnpm prisma:generate
# 填写prisma.config.ts，和 导出prismaClient
# 生成认证系统所需要的schema文件
pnpm auth:generate
# 再次更新本地generated\prisma\models文件
pnpm prisma:generate
# 内容同步到数据库，schema转成数据库表
pnpm prisma:migrate


# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start
```

## 🔧 环境变量配置

| 环境变量      | 描述                | 默认值 |
| ------------- | ------------------- | ------ |
| ORIGIN_SERVER | FRP服务器API地址    | -      |
| AUTH_SECRET   | NextAuth.js认证密钥 | -      |
| PORT          | 应用端口            | 3000   |

## 📱 界面功能介绍

---

## 🤝 贡献

欢迎提交Issue和Pull Request来改进FRP-UI！

## 📄 许可证

本项目采用MIT许可证 - 详情请查看[LICENSE](LICENSE)文件

## 📞 联系

如有问题或建议，请在GitHub仓库提交Issue。
