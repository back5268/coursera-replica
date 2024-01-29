import { FileUploader, InputFormDetail, MultiCheckBox, MultiRadio, SwitchForm, TextAreaForm } from '@components/form';
import { CourseValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addCourseApi, updateCourseApi } from '@api';
import { FormDetailModal } from '@components/base';
import { checkEqualProp, removeSpecialCharacter } from '@utils';
import { courseCharacteristic, courseType } from '@constant';

const defaultValues = {
  name: '',
  code: '',
  skills: '',
  price: 0,
  sale: 0,
  description: '',
  type: 1,
  status: 1,
  characteristic: []
};

const DetailCourse = (props) => {
  const { show, setShow, setParams, data } = props;
  const [avatar, setAvatar] = useState(null);
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
    resolver: yupResolver(CourseValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item._id) {
      console.log(item);
      const characteristic = [];
      if (item.isHot) characteristic.push('isHot');
      if (item.isNew) characteristic.push('isNew');
      item.characteristic = characteristic;
      if (item?.skills && Array.isArray(item.skills)) item.skills = item?.skills?.join(', ');
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  const handleData = (data) => {
    const skills = data.skills?.replace(/ /g, '').split(',') || [];
    const isHot = data.characteristic?.includes('isHot');
    const isNew = data.characteristic?.includes('isNew');
    const newData = { ...data, skills, isHot, isNew, status: data.status ? 1 : 0, characteristic: undefined };
    if (isUpdate) return { ...checkEqualProp(newData, item), status: data.status ? 1 : 0, _id: show };
    else return newData;
  };

  return (
    <FormDetailModal
      title="khóa học"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
      }}
      isUpdate={isUpdate}
      insertApi={addCourseApi}
      updateApi={updateCourseApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="sm:w-full lg:w-4/12 p-2">
        <FileUploader label="Hình ảnh khóa học" data={avatar} setData={setAvatar} />
      </div>
      <div className="flex flex-wrap sm:w-full lg:w-8/12">
        <InputFormDetail id="name" label="Tên khóa học (*)" register={register} errors={errors} />
        <InputFormDetail id="code" label="Mã khóa học (*)" register={register} errors={errors} />
        <InputFormDetail label="Slug (*)" value={removeSpecialCharacter(watch('name')) || ''} disabled />
        <InputFormDetail id="skills" label="Kỹ năng" register={register} />
        <InputFormDetail type="number" id="price" label="Giá" register={register} errors={errors} />
        <InputFormDetail type="number" id="sale" label="Khuyến mãi" register={register} errors={errors} />
        <div className="lg:w-6/12"></div>
        <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
        <TextAreaForm id="description" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
        <MultiRadio label="Thể loại (*)" data={courseType} value={watch('type')} onChange={(e) => setValue('type', e)} />
        <MultiCheckBox
          label="Đặc điểm"
          data={courseCharacteristic}
          value={watch('characteristic')}
          onChange={(e) => setValue('characteristic', e)}
        />
      </div>
    </FormDetailModal>
  );
};

export default DetailCourse;
