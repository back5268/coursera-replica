import { FileUploader, FormDetail, InputForm, SwitchForm, TextAreaForm } from '@components/form';
import { Modal } from '@components/uiCore';
import { UserValidation } from '@lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetApi } from '@lib/react-query/useGetApi';
import { addUserApi, detailUserApi, updateUserApi } from '@api';

const UserInfo = ({ isUpdate, data, show, setShow, setParams }) => {
  const [avatar, setAvatar] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(UserValidation),
    defaultValues: {
      fullname: data?.fullname || '',
      username: data?.username || '',
      email: data?.email || '',
      address: data?.address || '',
      bio: data?.bio || '',
      password: '',
      status: data?.status || true
    }
  });

  const handleData = (data) => {
    return { ...data, status: data.status ? 1 : 0, _id: isUpdate ? show : undefined };
  };

  return (
    <FormDetail
      handleSubmit={handleSubmit}
      handleData={handleData}
      setShow={setShow}
      isUpdate={isUpdate}
      insertApi={addUserApi}
      updateApi={updateUserApi}
      setParams={setParams}
    >
      <div className="w-4/12 p-2">
        <FileUploader label="Ảnh đại diện" data={avatar} setData={setAvatar} />
      </div>
      <div className="flex flex-wrap w-8/12">
        <InputForm id="fullname" label="Họ tên (*)" watch={watch} setValue={setValue} errors={errors} />
        <InputForm id="username" label="Tài khoản (*)" watch={watch} setValue={setValue} errors={errors} />
        <InputForm id="email" label="Email (*)" watch={watch} setValue={setValue} errors={errors} />
        <InputForm id="password" label="Mật khẩu (*)" type="password" watch={watch} setValue={setValue} errors={errors} />
        <InputForm id="address" label="Địa chỉ" watch={watch} setValue={setValue} />
        <SwitchForm id="status" label="Trạng thái (*)" watch={watch} setValue={setValue} />
        <TextAreaForm id="bio" label="Mô tả" className="w-full p-2" watch={watch} setValue={setValue} />
      </div>
    </FormDetail>
  );
};

const DetailUser = (props) => {
  const { show, setShow = () => {}, setParams } = props;
  const isUpdate = typeof show === 'string';
  const { isLoading, data } = useGetApi(detailUserApi, { _id: show }, 'detailUser', isUpdate);

  return (
    <Modal title={isUpdate ? 'Cập nhật người dùng' : 'Thêm mới người dùng'} show={show} setShow={setShow}>
      {!isLoading && <UserInfo isUpdate={isUpdate} show={show} setShow={setShow} data={data} setParams={setParams} />}
    </Modal>
  );
};

export default DetailUser;
