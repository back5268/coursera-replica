import React, { useState } from 'react';
import { deleteLessonApi, getListLessonApi, updateLessonApi } from '@api';
import { InputFormV2, SelectFormV2 } from '@components/form';
import { statuses } from '@constant';
import { useGetParams } from '@hook';
import { useGetApi } from '@lib/react-query';
import DetailLesson from './Detail';
import { DataFilter, FormList, NumberBody, TimeBody } from '@components/base';
import { useDataState } from '@store';

const Filter = ({ setParams, courses = [] }) => {
  const [filter, setFilter] = useState({});

  return (
    <DataFilter filter={filter} setFilter={setFilter} setParams={setParams} className={'xs:w-full'}>
      <InputFormV2
        value={filter.keySearch}
        onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
        label="Tìm kiếm theo tiêu đề, tác giả"
      />
      <SelectFormV2
        value={filter.courseId}
        onValueChange={(e) => setFilter({ ...filter, courseId: e.value })}
        data={courses.map(c => ({ label: c.name, key: c._id }))}
        label="Khóa học"
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
  const { courses } = useDataState();
  const [show, setShow] = useState(false);

  const columns = [
    { label: 'Khóa học', body: (item) => courses.find((c) => c._id === item.courseId)?.name },
    { label: 'Tiêu đề bài giảng', field: 'title' },
    { label: 'Tác giả', field: 'author' },
    { label: 'Thời gian học', body: (item) => NumberBody(item.time) },
    { label: 'Thời gian tạo', body: (item) => TimeBody(item.createdAt) },
    { label: 'Thời gian cập nhật', body: (item) => TimeBody(item.updatedAt) }
  ];

  const { isLoading, data } = useGetApi(getListLessonApi, params, 'lessons');

  return (
    <>
      <DetailLesson show={show} setShow={setShow} setParams={setParams} data={data?.documents} courses={courses} />
      <FormList
        isLoading={isLoading}
        title="Quản lý bài giảng"
        data={data?.documents}
        totalRecord={data?.total}
        columns={columns}
        params={params}
        setParams={setParams}
        baseActions={['insert', 'detail', 'delete']}
        actionsInfo={{ onViewDetail: (item) => setShow(item._id), deleteApi: deleteLessonApi }}
        statusInfo={{ changeStatusApi: updateLessonApi }}
        headerInfo={{ onInsert: () => setShow(true) }}
      ><Filter setParams={setParams} courses={courses} /></FormList>
    </>
  );
};

export default Lessons;
