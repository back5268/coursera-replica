import React from 'react';
import { Button, Hr } from '../uiCore';

const FormDetail = (props) => {
  const { children, handleSubmit, handleData, setShow = () => {} } = props;

  const onSubmit = (e) => {
    handleData(e);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='p-6'>
      <div className="card flex flex-wrap">{children}</div>
      </div>
      <Hr/>
      <div className="flex gap-2 justify-end px-6 py-4">
        <Button label="Hủy" severity="secondary" onClick={() => setShow(false)} />
        <Button type="submit" label="Xác nhận" />
      </div>
    </form>
  );
};

export default FormDetail;
