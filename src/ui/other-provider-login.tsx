import { authClient } from "@/lib/auth-client";
import {
  CaretRightOutlined,
  FacebookOutlined,
  GithubFilled,
  GoogleOutlined,
} from "@ant-design/icons";
import { App, Collapse, theme } from "antd";
import React from "react";

function OtherProviderLogin() {
  const { message, modal, notification } = App.useApp(); // 切换登录/注册标签
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 24,
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: "none",
  };

  return (
    <Collapse
      bordered={false}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      defaultActiveKey={["provider-login"]}
      style={{ background: token.colorBgContainer }}
      items={[
        {
          key: "provider-login",
          label: <a href="#">其他登录方式</a>,
          children: (
            <div className="flex flex-wrap items-center gap-3">
              <GithubFilled
                className="rounded-md p-3 border cursor-pointer"
                color="#333"
                onClick={() => {
                  authClient.signIn
                    .social({
                      provider: "github",
                      errorCallbackURL: "/error",
                      callbackURL: "/dashboard",
                    })
                    .then((data) => {
                      message.success("登录成功" + JSON.stringify(data));
                    })
                    .catch((error) => {
                      console.log("error:", error);
                      message.error(`登录失败：${error.message}`);
                    });
                }}
              />
              <GoogleOutlined
                className="rounded-md p-3 border cursor-pointer"
                color="#333"
              />
              <FacebookOutlined
                className="rounded-md p-3 border cursor-pointer"
                color="#333"
              />
            </div>
          ),
          style: panelStyle,
        },
      ]}
    />
  );
}

export default OtherProviderLogin;
