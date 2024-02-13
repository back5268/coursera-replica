import { InputFormDetail, SwitchForm, TextAreaForm, UploadImage } from '@components/form';
import { Button, Hr } from '@components/uiCore';
import { useAuthContext } from '@context/AuthContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserValidation } from '@lib/validation';
import { useDataState } from '@store';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const defaultValues = {
  fullName: '',
  username: '',
  email: '',
  address: '',
  bio: '',
  password: '',
  role: 'user',
  status: 1
};

const Info = () => {
  const { userInfo, setUserInfo } = useAuthContext();
  const { setUsers } = useDataState();
  const [avatar, setAvatar] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(UserValidation),
    defaultValues
  });

  useEffect(() => {
    if (userInfo.avatar) setAvatar(userInfo.avatar);
    for (const key in defaultValues) {
      setValue(key, userInfo[key]);
    }
  }, [userInfo]);

  return (
    <form className="flex flex-col gap-2 w-full px-8">
      <div className="flex justify-between items-center">
        <h2 className="uppercase font-semibold text-left p-2">Thông tin cá nhân</h2>
        <Button type="submit" label="Cập nhật" />
      </div>
      <Hr />

      <div className={'flex flex-wrap'}>
        <div className="w-4/12 p-2">
          <UploadImage label="Ảnh đại diện" data={avatar} setData={setAvatar} />
        </div>
        <div className="flex flex-wrap w-8/12">
          <InputFormDetail id="fullName" label="Họ tên (*)" register={register} errors={errors} className="!w-full my-1" />
          <InputFormDetail id="username" label="Tài khoản (*)" register={register} errors={errors} className="!w-full my-1" />
          <InputFormDetail id="email" label="Email (*)" register={register} errors={errors} className="!w-full my-1" />
          <InputFormDetail
            id="password"
            label="Mật khẩu (*)"
            type="password"
            register={register}
            errors={errors}
            className="!w-full my-1"
          />
          <InputFormDetail id="address" label="Địa chỉ" register={register} className="!w-full my-1" />
          <TextAreaForm id="bio" label="Mô tả" className="w-full p-2 my-1" watch={watch} setValue={setValue} />
        </div>
      </div>
      <Hr />
    </form>
  );
};

export default Info;
