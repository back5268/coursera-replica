import React from 'react';
import { Button, Hr, Modal } from '../uiCore';
import { useConfirmState } from '@/store';

const ConfirmModal = (props) => {
  const { confirmInfo = {}, show, hideConfirm } = useConfirmState();

  return (
    <Modal size="md" show={show} setShow={hideConfirm} title="Coursera Replica">
      <form>
        <div className="p-6">
          {confirmInfo.title || "Bạn có chắc chắn muốn tiếp tục?"}
        </div>
        <Hr />
        <div className="flex gap-2 justify-end px-6 py-4">
          <Button label="Hủy" severity="secondary" onClick={() => hideConfirm()} />
          <Button type="submit" label="Xác nhận" />
        </div>
      </form>
    </Modal>
  );
};

export default ConfirmModal;
