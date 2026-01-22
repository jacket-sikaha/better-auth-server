"use client";
import { authClient } from "@/lib/auth-client";
import { App, Button, Form, Input } from "antd";
import { redirect, useSearchParams } from "next/navigation";
const { Password } = Input;

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  console.log("email:", email);
  const { message, modal, notification } = App.useApp(); // 切换登录/注册标签
  const [form] = Form.useForm();
  return (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <div className="w-96 text-center">
        <h2 className="text-2xl font-bold mb-4">重置密码</h2>
      </div>
      <div className="flex items-center gap-2 justify-center w-96">
        <div>邮箱:</div>
        <div>{email}</div>
      </div>
      <Form
        form={form}
        onFinish={async (values) => {
          if (values.newPassword !== values.confirmNewPassword) {
            message.error("两次输入密码不一致");
            return;
          }

          if (!token) {
            // 处理错误
            message.error("无效的重置令牌");
            return;
          }
          await authClient.resetPassword(
            {
              token,
              newPassword: values.newPassword,
            },
            {
              onSuccess: (ctx) => {
                console.log("ctx:", ctx);
                if (ctx.response.ok) {
                  message.success("密码重置成功");
                  redirect("/");
                }
              },
              onError: (ctx) => {
                console.error("ctx:", ctx.error.message);
                message.error("密码重置失败" + ctx.error.message);
              },
            },
          );
        }}
      >
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[{ required: true, message: "请输入新密码" }]}
          required
        >
          <Password />
        </Form.Item>
        <Form.Item
          label="确认新密码"
          name="confirmNewPassword"
          rules={[{ required: true, message: "请确认新密码" }]}
          required
        >
          <Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            重置密码
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ResetPasswordPage;
