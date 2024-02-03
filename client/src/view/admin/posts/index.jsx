import React, { useState } from 'react';
import { deletePostApi, listPostApi } from '@api';
import { InputFormV2 } from '@components/form';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import DetailPost from './Detail';
import { DataFilter, DataTable, NumberBody, TimeBody } from '@components/base';

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

  const columns = [
    { label: 'Tiêu đề bài viết', field: 'title' },
    { label: 'Người viết', body: (item) => NumberBody(item.time) },
    { label: 'Thời gian đọc', body: (item) => NumberBody(item.time) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updateAt) }
  ];

  const { isLoading, data } = useGetApi(listPostApi, params, 'posts');

  return (
    <>
      <DetailPost show={show} setShow={setShow} setParams={setParams} data={data?.documents} />
      <DataTable
        isLoading={isLoading}
        title="Quản lý bài viết"
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['insert', 'detail', 'delete']}
        setShow={setShow}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id), deleteApi: deletePostApi }}
        headerInfo={{ onInsert: () => setShow(true) }}
      ><Filter setParams={setParams} /></DataTable>
    </>
  );
};

export default Posts;
