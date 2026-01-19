"use client";
import { authClient } from "@/lib/auth-client";
import { App } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function LoginRegisterPage() {
  const { message, modal, notification } = App.useApp(); // 切换登录/注册标签
  const [isLogin, setIsLogin] = useState(true);

  // 表单状态管理
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // 仅注册页使用
  });

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 处理表单提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        console.log("登录请求:", formData);
        const { data, error } = await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
          callbackURL: "/dashboard",
          rememberMe: false,
        });
      } else {
        console.log("注册请求:", formData);
        const { data, error } = await authClient.signUp.email(
          {
            email: formData.email, // 用户邮箱地址
            password: formData.password, // 用户密码 -> 默认至少 8 个字符
            name: formData.name, // 用户显示名称
            image: formData.name, // 用户头像 URL（可选）
            callbackURL: "/dashboard", // 用户验证邮箱后重定向的 URL（可选）
          },
          {
            onRequest: (ctx) => {
              console.log("ctx:", ctx);
              // 显示加载状态
            },
            onSuccess: (ctx) => {
              console.log("ctx:", ctx);
              // 重定向到仪表板或登录页面
            },
            onError: (ctx) => {
              console.log("ctx:", ctx);
              throw ctx.error;
              // 显示错误信息
            },
          }
        );
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* 左侧表单区域 */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16">
        <div className="max-w-md mx-auto w-full">
          {/* 标题/Logo区（参考图风格） */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Soulgame</h1>
            <p className="text-gray-600">登录/注册你的账号，开启专属体验</p>
          </div>

          {/* 登录/注册标签切换 */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 font-medium border-b-2 ${
                isLogin
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500"
              }`}
            >
              登录
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 font-medium border-b-2 ml-4 ${
                !isLogin
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500"
              }`}
            >
              注册
            </button>
          </div>

          {/* 表单区域 */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 注册页额外显示姓名输入框 */}
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="input-field"
                  placeholder="请输入你的姓名"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="请输入你的邮箱"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="input-field"
                placeholder="请输入密码"
              />
            </div>

            {/* 登录页显示忘记密码 */}
            {isLogin && (
              <div className="text-right">
                <a href="#" className="text-sm text-primary hover:underline">
                  忘记密码？
                </a>
              </div>
            )}

            <button type="submit" className="btn-primary">
              {isLogin ? "登录" : "注册"}
            </button>
          </form>
        </div>
      </div>

      {/* 右侧图片展示区域 */}
      <div className="hidden md:block w-1/2 relative">
        {/* 替换为你参考图的图片地址（本地图片放public目录，远程图片直接填URL） */}
        <Image
          src="https://t.alcy.cc/pc" // 建议将参考图放到public目录下，命名为bg-image.jpg
          alt="背景图"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
