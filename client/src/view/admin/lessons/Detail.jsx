import { InputFormDetail, SelectFormDetail, SwitchForm, TextAreaForm } from '@components/form';
import { LessonValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { addLessonApi, updateLessonApi } from '@api';
import { FormDetailModal } from '@components/base';
import { checkEqualProp } from '@utils';

const defaultValues = {
  courseId: '',
  title: '',
  author: '',
  time: 0,
  content: '',
  description: '',
  status: 1
};

const DetailLesson = (props) => {
  const { show, setShow, setParams, data, courses } = props;
  const isUpdate = typeof show === 'string';
  const item = isUpdate ? data.find((d) => d._id === show) : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset
  } = useForm({
    resolver: yupResolver(LessonValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item._id) {
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const newData = { ...data, status: data.status ? 1 : 0 };
    if (isUpdate) return { ...checkEqualProp(newData, item), status: data.status ? 1 : 0, _id: show };
    else return newData;
  };

  return (
    <FormDetailModal
      title="bài giảng"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
      }}
      isUpdate={isUpdate}
      insertApi={addLessonApi}
      updateApi={updateLessonApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="flex flex-wrap w-full">
        <SelectFormDetail
          id="courseId"
          label="Khóa học (*)"
          data={courses.map((c) => ({ label: c.name, key: c._id }))}
          watch={watch}
          setValue={setValue}
          errors={errors}
        />
        <InputFormDetail id="title" label="Tiêu đề (*)" register={register} errors={errors} />
        <InputFormDetail id="author" label="Tác giả (*)" register={register} errors={errors} />
        <InputFormDetail type="number" id="time" label="Thời gian học (*)" register={register} errors={errors} />
        <div className="lg:w-6/12"></div>
        <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
        <TextAreaForm id="content" label="Nội dung (*)" className="w-full p-2" watch={watch} setValue={setValue} errors={errors} />
        <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
      </div>
    </FormDetailModal>
  );
};

export default DetailLesson;
