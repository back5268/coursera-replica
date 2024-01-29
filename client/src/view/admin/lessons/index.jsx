import React, { useState } from 'react';
import { deleteCourseApi, listCourseApi, updateCourseApi } from '@api';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { courseType, statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import DetailCourse from './Detail';
import { DataFilter, DataTable, NumberBody, TimeBody } from '@components/base';

const Filter = ({ setParams }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full lg:w-9/12'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tên, mã khóa học"
      />
      <InputFormV2 type="number" value={filter.fromPrice} onChange={(e) => setFilter({ ...filter, fromPrice: e.target.value })} label="Giá từ" />
      <InputFormV2 type="number" value={filter.toPrice} onChange={(e) => setFilter({ ...filter, toPrice: e.target.value })} label="Giá đến" />
      <SelectFormV2
        value={filter.type}
        onValueChange={(e) => setFilter({ ...filter, type: e.value })}
        data={courseType}
        label="Thể loại"
      />
      <SelectFormV2
        value={filter.status}
        onValueChange={(e) => setFilter({ ...filter, status: e.value })}
        data={statuses}
        label="Trạng thái"
      />
    </DataFilter>
  );
};

const Lessons = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [show, setShow] = useState(false);

  const columns = [
    { label: 'Tên khóa học', field: 'name' },
    { label: 'Mã khóa học', field: 'code' },
    { label: 'Thể loại', body: (item) => courseType.find(c => c.key === item.type)?.label },
    { label: 'Giá', body: (item) => NumberBody(item.price) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updateAt) }
  ];

  const { isLoading, data } = useGetApi(listCourseApi, params, 'Lessons');

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

export default Lessons;
