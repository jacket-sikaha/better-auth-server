import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const verify = () => {
  return new Promise((resolve, reject) => {
    transporter.verify((error: any, success: any) => {
      if (error) {
        reject(error);
      } else {
        // logger.info("服务器已准备好接收我们的消息");
        console.log("服务器已准备好接收我们的消息");
        resolve(success);
      }
    });
  });
};

const sendMail = (to: string, subject: string, text: string) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_FROM,
        to: to || "sikara@163.com" || "2522754658@qq.com",
        subject: subject || "HHS系统 发送电子邮件", // 邮件标题
        text: text || "验证码为：" + text, // 邮件内容，code 为发送的验证码信息，这里的内容可以自定义
        // html: `<b>嘿! </b><br> 这是我使用 Nodemailer 发送的第一条消息🎉👏 ${text}`,
      },
      (error, info) => {
        if (error) {
          reject(error);
        }
        resolve(info);
        // only needed when using pooled connections
        transporter.close();
      },
    );
  });
};

const sendCheckinEMail = async (to: string, subject: string, text: string) => {
  try {
    await Promise.all([verify(), sendMail(to, subject, text)]);
  } catch (error) {
    throw error;
  }
};

export { sendCheckinEMail };
