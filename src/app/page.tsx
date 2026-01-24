"use client";
import { authClient } from "@/lib/auth-client";
import OtherProviderLogin from "@/ui/other-provider-login";
import { App, Input } from "antd";
import Image from "next/image";
import { useState } from "react";
const { Password } = Input;

export default function LoginRegisterPage() {
  const { message, modal, notification } = App.useApp(); // 切换登录/注册标签
  const [isLogin, setIsLogin] = useState(true);

  // 表单状态管理
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "", // 仅注册页使用
  });

  const verifyEmail = () => {
    modal.confirm({
      title: "请验证您的邮箱地址",
      content: "确认重新发送验证邮件吗？",
      okText: "重新发送",
      cancelText: "取消",
      onOk: async () => {
        await authClient.sendVerificationEmail(
          {
            email: formData.email,
            callbackURL: "/",
          },
          {
            onSuccess: (ctx) => {
              message.success("验证邮件已重新发送");
            },
            onError: (ctx) => {
              console.error("ctx:", ctx.error.message);
              message.error("重新发送验证邮件失败" + ctx.error.message);
            },
          },
        );
      },
    });
  };

  // 处理表单输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isLogin) {
        console.log("登录请求:", formData);
        await authClient.signIn.email(
          {
            email: formData.email,
            password: formData.password,
            callbackURL: "/dashboard",
            rememberMe: false,
          },
          {
            onSuccess: (ctx) => {
              message.success("登录成功");
            },
            onError: (ctx) => {
              // 处理错误
              if (ctx.error.status === 403) {
                verifyEmail();
                return;
              }
              // 也可以显示原始错误信息
              throw ctx.error;
            },
          },
        );

        // 重定向到仪表板或登录页面
      } else {
        console.log("注册请求:", formData);
        await authClient.signUp.email(
          {
            email: formData.email, // 用户邮箱地址
            password: formData.password, // 用户密码 -> 默认至少 8 个字符
            name: formData.name, // 用户显示名称
            image: formData.name, // 用户头像 URL（可选）
            callbackURL: "/dashboard", // 用户验证邮箱后重定向的 URL（可选）
          },
          {
            onSuccess: (ctx) => {
              console.log("ctx:", ctx);
              message.success("注册成功");
              // 重定向到仪表板或登录页面
            },
            onError: (ctx) => {
              if (ctx.error.status === 403) {
                verifyEmail();
                return;
              }
              throw ctx.error;
              // 显示错误信息
            },
          },
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
        <div className="max-w-md mx-auto w-full flex flex-col gap-3">
          {/* 标题/Logo区（参考图风格） */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Soulgame</h1>
            <p className="text-gray-600">登录/注册你的账号，开启专属体验</p>
          </div>

          {/* 登录/注册标签切换 */}
          <div className="flex border-b">
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
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="请输入你的姓名"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                邮箱
              </label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="请输入你的邮箱"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                密码
              </label>
              <Password
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                placeholder="请输入密码"
              />
            </div>

            {/* 登录页显示忘记密码 */}
            {isLogin && (
              <div className="text-right">
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                  onClick={async () => {
                    if (!formData.email) {
                      message.error("请输入邮箱");
                      return;
                    }
                    authClient
                      .requestPasswordReset({
                        email: formData.email, // required
                        redirectTo: "/reset-password?email=" + formData.email,
                      })
                      .then((ctx) => {
                        console.log("ctx:", ctx);
                        message.success("密码重置链接已发送");
                      })
                      .catch((error) => {
                        console.log("error:", error);
                        message.error(error.message || "发送失败");
                      });
                  }}
                >
                  忘记密码？
                </a>
              </div>
            )}

            <button type="submit" className="btn-primary">
              {isLogin ? "登录" : "注册"}
            </button>
            <OtherProviderLogin />
          </form>
        </div>
      </div>

      {/* 右侧图片展示区域 */}
      <div className="hidden md:block w-1/2 relative">
        <Image
          src="https://t.alcy.cc/pc"
          alt="背景图"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
