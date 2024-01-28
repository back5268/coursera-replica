import React from 'react';
import { Button, Hr, Modal } from '../uiCore';
import { useConfirmState } from '@/store';

const ConfirmModal = () => {
  const { confirmInfo = {}, show, hideConfirm } = useConfirmState();

  return (
    <Modal size="md" show={show} setShow={hideConfirm} title="Coursera Replica">
      <div className="p-6">{confirmInfo.title || 'Bạn có chắc chắn muốn tiếp tục?'}</div>
      <Hr />
      <div className="flex gap-2 justify-end px-6 py-4">
        <Button className="px-6" label="Hủy" severity="secondary" onClick={() => hideConfirm()} />
        <Button
          className="px-6"
          label="Xác nhận"
          onClick={async () => {
            await confirmInfo?.action();
            hideConfirm();
          }}
        />
      </div>
    </Modal>
  );
};

export default ConfirmModal;
