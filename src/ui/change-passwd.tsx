import ModalComponent from "@/components/client/common-modal";
import { authClient } from "@/lib/auth-client";
import { App, Form, Input } from "antd";
const { Password } = Input;
function ChangePasswd() {
  const { message, modal, notification } = App.useApp(); // 切换登录/注册标签
  const [form] = Form.useForm();
  return (
    <ModalComponent
      title="修改密码"
      trigger={
        <a href="#" className="text-sm text-primary hover:underline">
          修改密码
        </a>
      }
      content={
        <Form form={form}>
          <Form.Item
            label="旧密码"
            name="currentPassword"
            rules={[{ required: true, message: "请输入旧密码" }]}
            required
          >
            <Password />
          </Form.Item>
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
        </Form>
      }
      actions={async () => {
        const values = await form.validateFields();
        if (values.currentPassword === values.newPassword) {
          message.error("新密码不能与旧密码相同");
          throw new Error("新密码不能与旧密码相同");
        }
        if (values.newPassword !== values.confirmNewPassword) {
          message.error("两次输入密码不一致");
          throw new Error("两次输入密码不一致");
        }
        await authClient.changePassword(
          {
            newPassword: values.newPassword, // required
            currentPassword: values.currentPassword, // required
            revokeOtherSessions: true,
          },
          {
            onSuccess: (ctx) => {
              console.log("ctx:", ctx);
              message.success("重置密码成功");
              form.resetFields();
            },
            onError: (ctx) => {
              message.error(ctx.error.message || "重置密码失败");
              throw ctx.error;
            },
          },
        );
      }}
    />
  );
}

export default ChangePasswd;
