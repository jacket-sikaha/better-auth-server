import { Modal } from "antd";
import React, { useState } from "react";

function ModalComponent({
  title,
  trigger,
  content,
  actions,
}: {
  title?: string;
  trigger: React.ReactNode;
  content: React.ReactNode;
  actions?: () => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    try {
      await actions?.();
      setOpen(false);
    } catch (error) {
      console.error("操作失败:", error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <div onClick={showModal}>{trigger}</div>
      <Modal
        title={title || ""}
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {content}
      </Modal>
    </>
  );
}

export default ModalComponent;
