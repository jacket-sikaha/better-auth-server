import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { App } from "antd";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Better Auth Server",
  description: "Universal Authentication Service based on better-auth",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-svh w-full grid grid-rows-[auto_1fr]">
          <AntdRegistry>
            <App>
              <main className="h-full overflow-auto">{children}</main>
            </App>
          </AntdRegistry>
        </div>
      </body>
    </html>
  );
}
