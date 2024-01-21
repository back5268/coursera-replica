import { ActionsBody, DataFilter, DataTable, InputForm, StatusBody } from '@/components/form';
import { useGetParams } from '@/hook';
import React, { useState } from 'react';
import DetailUser from './DetailUser';

const Filter = () => {
  const [filter,  setFilter] = useState({})

  return (
    <DataFilter filter={filter} setFilter={setFilter}>
      <InputForm value={filter.keySearch} onChange={e => setFilter({ keySearch: e.value })} label="Tìm kiếm theo tên, tài khoản" className="w-3/12" />
      <InputForm label="Tìm kiếm theo email" className="w-3/12" />
    </DataFilter>
  );
};

const Users = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [show, setShow] = useState(false);

  const columns = [
    { label: 'Họ tên', field: 'fullname' },
    { label: 'Username', field: 'username' },
    { label: 'Email', field: 'email' },
    { label: 'Thời gian tạo', field: 'createAt' },
    { label: 'Thời gian cập nhật', field: 'updateAt' },
    { label: 'Trạng thái', body: (item) => StatusBody(item.status) },
    {
      label: 'Thao tác',
      body: (item) => ActionsBody({ baseActions: ['detail', 'delete'], item, handleViewDetail: () => setShow(item.id) })
    }
  ];

  const data = [
    {
      id: 1,
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    },
    {
      fullname: 'Hoàng Bách',
      username: 'hoangbackz',
      email: 'hoangbackz@gmail.com',
      createAt: '20/01/2024 20:00:00',
      updateAt: '20/01/2024 20:00:00',
      status: 1
    }
  ];

  return (
    <>
      <DetailUser show={show} setShow={setShow} />
      <DataTable
        title="Quản lý người dùng"
        data={data}
        totalRecord={data.length}
        columns={columns}
        params={params}
        setParams={setParams}
        dataFilter={Filter}
        baseActions={['insert', 'detail', 'delete', 'update']}
        setShow={setShow}
      />
    </>
  );
};

export default Users;
