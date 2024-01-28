import React, { useState } from 'react';
import { deleteUserApi, listUserApi, updateUserApi } from '@api';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import DetailUser from './DetailUser';
import { DataFilter, DataTable, TimeBody } from '@components/base';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full sm:w-6/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tên, tài khoản"
      />
      <InputFormV2 value={filter.email} onChange={(e) => setFilter({ ...filter, email: e.target.value })} label="Tìm kiếm theo email" />
      <SelectFormV2
        value={filter.status}
        onValueChange={(e) => setFilter({ ...filter, status: e.value })}
        data={statuses}
        label="Trạng thái"
      />
    </DataFilter>
  );
};

const Users = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [show, setShow] = useState(false);

  const columns = [
    { label: 'Họ tên', field: 'fullName' },
    { label: 'Username', field: 'username' },
    { label: 'Email', field: 'email' },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updateAt) }
  ];

  const { isLoading, data } = useGetApi(listUserApi, params, 'user');

  return (
    <>
      <DetailUser show={show} setShow={setShow} setParams={setParams} data={data?.documents} />
      <DataTable
        isLoading={isLoading}
        title="Quản lý người dùng"
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        Filter={Filter}
        baseActions={['insert', 'detail', 'delete', 'update']}
        setShow={setShow}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id), deleteApi: deleteUserApi }}
        statusInfo={{ changeStatusApi: updateUserApi }}
        headerInfo={{ onInsert: () => setShow(true) }}
      />
    </>
  );
};

export default Users;
