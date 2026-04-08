# better-auth-server

**View English Documentation**: [README_EN.md](README_EN.md)

[![DeepWiki Index](https://deepwiki.com/badge.svg)](https://deepwiki.com/jacket-sikaha/better-auth-server)

<div align="center">
  <p>
    <b>better-auth-server</b>
  </p>
  <p>
    🚀 基于 better-auth 的通用认证服务
  </p>
</div>

## 📋 项目概述

better-auth-server 是一个基于 Next.js 和 better-auth 库构建的通用认证服务，提供用户认证解决方案和 Token 派发功能，可以轻松集成到任何需要认证的应用系统中。

### 核心特性

- 🔐 **完整的认证系统** - 支持邮箱/密码登录、注册、密码重置等功能
- 🎯 **Token 派发** - 生成和管理 JWT Token，用于服务间授权
- 📦 **容器化部署** - 支持 Docker 和 Docker Compose 一键部署
- � **现代化 UI** - 基于 Ant Design 的美观界面
- 📊 **管理面板** - 提供用户管理和系统监控功能
- � **REST API** - 提供标准化的认证 API 接口

## 🚀 主要功能

### 认证功能

✅ **用户注册**

- 邮箱验证
- 密码强度检查

✅ **用户登录**

- 邮箱/密码登录
- 记住我功能

✅ **密码管理**

- 密码重置

✅ **Token 管理**

- JWT Token 生成
- Token 失效管理

✅ **配置管理**

- 认证策略配置
- Token 过期时间设置

## 🛠️ 技术栈

| 技术/框架    | 版本    | 用途      |
| ------------ | ------- | --------- |
| Next.js      | ^16.0.0 | React框架 |
| React        | ^19.1.0 | UI库      |
| Ant Design   | ^6.0.0  | UI组件库  |
| TypeScript   | ^5      | 类型系统  |
| Tailwind CSS | ^4      | 样式框架  |
| better-auth  | ^1.5.0  | 认证库    |
| Prisma       | ^7.6.0  | ORM框架   |
| SQLite       | -       | 数据库    |

## 📦 安装与部署

### Docker 部署（推荐）

```bash
docker-compose up -d
```

### Docker Compose 配置示例

```yaml
version: "3.8"

services:
  better-auth-server:
    image: docker.io/sikaha/better-auth-server:latest
    container_name: better-auth-server
    ports:
      - "3000:3000"
    environment:
      - AUTH_SECRET=your-secret # 替换为实际的认证密钥
      - DATABASE_URL=sqlite:///db/dev.db
    volumes:
      - ./db:/app/db
    restart: unless-stopped
    networks:
      - auth-network

networks:
  auth-network:
    driver: bridge
```

### 本地开发

```bash
# 安装依赖
pnpm install

# 生成认证密钥
pnpm auth

# 初始化数据库
pnpm prisma:init

# 生成 Prisma Client
pnpm prisma:generate

# 生成认证系统 schema
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

| 环境变量     | 描述            | 默认值 |
| ------------ | --------------- | ------ |
| AUTH_SECRET  | 认证密钥        | -      |
| DATABASE_URL | 数据库连接地址  | -      |
| PORT         | 应用端口        | 3000   |
| SMTP_HOST    | SMTP 服务器地址 | -      |
| SMTP_PORT    | SMTP 服务器端口 | 587    |
| SMTP_USER    | SMTP 用户名     | -      |
| SMTP_PASS    | SMTP 密码       | -      |
| SMTP_FROM    | 发件人邮箱      | -      |

## 📡 API 接口

### 认证接口

#### 注册

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 登录

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 获取 Token

```
POST /api/auth/token
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### 刷新 Token

```
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### 验证 Token

```
POST /api/auth/verify
Content-Type: application/json

{
  "token": "your-jwt-token"
}
```

## 📱 界面功能

### 登录页面

- 邮箱/密码登录
- 忘记密码功能
- 响应式设计

### 注册页面

- 用户注册表单
- 密码强度提示
- 邮箱验证

### 控制面板

- 用户信息展示
- Token 管理


## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进 better-auth-server！

## 📄 许可证

本项目采用 MIT 许可证 - 详情请查看 [LICENSE](LICENSE) 文件

## 📞 联系

如有问题或建议，请在 GitHub 仓库提交 Issue。
