import { Button, Hr, Modal } from '@components/uiCore';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginConfirm = (props) => {
  const navigate = useNavigate();
  const { title, show, setShow = () => {} } = props;

  return (
    <Modal size="md" show={show} setShow={setShow} title="Coursera Replica">
      <div className="p-6">Vui lòng đăng nhập để có thể {title}!</div>
      <Hr />
      <div className="flex gap-2 justify-end py-4 mr-4">
        <Button label="Hủy" severity="secondary" onClick={() => setShow(false)} />
        <Button label="Xác nhận" onClick={() => navigate('/auth/signin')} />
      </div>
    </Modal>
  );
};

export default LoginConfirm;
