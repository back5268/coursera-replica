import { FileUploader, InputFormDetail, MultiRadio, SwitchForm, TextAreaForm } from '@components/form';
import { UserValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { addUserApi, updateUserApi } from '@api';
import { FormDetailModal } from '@components/base';
import { checkEqualProp } from '@utils';
import { userRoles } from '@constant';

const defaultValues = {
  fullName: '',
  username: '',
  email: '',
  address: '',
  bio: '',
  password: '',
  role: '',
  status: 1
};

const DetailUser = (props) => {
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
    resolver: yupResolver(UserValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate) {
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
      title="người dùng"
      show={show}
      setShow={() => {
        setShow(false);
        reset();
      }}
      isUpdate={isUpdate}
      insertApi={addUserApi}
      updateApi={updateUserApi}
      handleData={handleData}
      handleSubmit={handleSubmit}
      setParams={setParams}
    >
      <div className="w-4/12 p-2">
        <FileUploader label="Ảnh đại diện" data={avatar} setData={setAvatar} />
      </div>
      <div className="flex flex-wrap w-8/12">
        <InputFormDetail id="fullName" label="Họ tên (*)" register={register} errors={errors} />
        <InputFormDetail id="username" label="Tài khoản (*)" register={register} errors={errors} />
        <InputFormDetail id="email" label="Email (*)" register={register} errors={errors} />
        <InputFormDetail id="password" label="Mật khẩu (*)" type="password" register={register} errors={errors} />
        <InputFormDetail id="address" label="Địa chỉ" register={register} />
        <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
        <TextAreaForm id="bio" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
        <MultiRadio label="Quyền" data={userRoles} value={watch('role')} onChange={(e) => setValue('role', e)} />
      </div>
    </FormDetailModal>
  );
};

export default DetailUser;
