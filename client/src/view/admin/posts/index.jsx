import React, { useState } from 'react';
import { deletePostApi, getListPostApi } from '@api';
import { InputFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import DetailPost from './Detail';
import { DataFilter, FormList, NumberBody, TimeBody } from '@components/base';
import {useDataState} from "@store";

const Filter = ({ setParams, courses = [] }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-9/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tiêu đề bài viết"
      />
    </DataFilter>
  );
};

const Posts = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [show, setShow] = useState(false);
  const {users} = useDataState();

  const columns = [
    { label: 'Tiêu đề bài viết', field: 'title' },
    { label: 'Người viết', body: (item) => users.find(u => u._id === item.by)?.fullName },
    { label: 'Thời gian đọc (phút)', body: (item) => NumberBody(item.time) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  const { isLoading, data } = useGetApi(getListPostApi, params, 'posts');

  return (
    <>
      <DetailPost show={show} setShow={setShow} setParams={setParams} data={data?.documents} />
      <FormList
        isLoading={isLoading}
        title="Quản lý bài viết"
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['insert', 'detail', 'delete']}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id), deleteApi: deletePostApi }}
        headerInfo={{ onInsert: () => setShow(true) }}
      ><Filter setParams={setParams} /></FormList>
    </>
  );
};

export default Posts;
