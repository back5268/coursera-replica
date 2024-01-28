import React, { useState } from 'react';
import { deleteCourseApi, listCourseApi, updateCourseApi } from '@api';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import DetailCourse from './Detail';
import { DataFilter, DataTable, NumberBody, TimeBody } from '@components/base';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-full'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tên, mã khóa học"
      />
      <InputFormV2 value={filter.fromPrice} onChange={(e) => setFilter({ ...filter, fromPrice: e.target.value })} label="Giá từ" />
      <InputFormV2 value={filter.toPrice} onChange={(e) => setFilter({ ...filter, toPrice: e.target.value })} label="Giá đến" />
      <SelectFormV2
        value={filter.status}
        onValueChange={(e) => setFilter({ ...filter, status: e.value })}
        data={statuses}
        label="Trạng thái"
      />
    </DataFilter>
  );
};

const Courses = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [show, setShow] = useState(false);

  const columns = [
    { label: 'Tên khóa học', field: 'name' },
    { label: 'Mã khóa học', field: 'code' },
    { label: 'Giá', body: (item) => NumberBody(item.price) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updateAt) }
  ];

  const { isLoading, data } = useGetApi(listCourseApi, params, 'courses');

  return (
    <>
      <DetailCourse show={show} setShow={setShow} setParams={setParams} data={data?.documents} />
      <DataTable
        isLoading={isLoading}
        title="Quản lý khóa học"
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        Filter={Filter}
        baseActions={['insert', 'detail', 'delete', 'update']}
        setShow={setShow}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id), deleteApi: deleteCourseApi }}
        statusInfo={{ changeStatusApi: updateCourseApi }}
        headerInfo={{ onInsert: () => setShow(true) }}
      />
    </>
  );
};

export default Courses;
