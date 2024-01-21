import { FileUploader, FormDetail, InputForm, SwitchForm, TextAreaForm } from '@/components/form';
import { Modal } from '@/components/uiCore';
import { UserValidation } from '@/lib/validation';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const DetailUser = (props) => {
  const { show, setShow = () => {} } = props;
  const [ avatar, setAvatar ] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(UserValidation)
  });

  console.log(avatar);

  const handleData = (data) => {
    console.log(data);
  };

  return (
    <Modal title={typeof show === 'number' ? 'Cập nhật người dùng' : 'Thêm mới người dùng'} show={show} setShow={setShow}>
      <FormDetail handleSubmit={handleSubmit} handleData={handleData} setShow={setShow}>
        <div className="w-4/12 p-2">
          <FileUploader label="Ảnh đại diện" data={avatar} setData={setAvatar} />
        </div>
        <div className="flex flex-wrap w-8/12">
          <InputForm id="fullname" label="Họ tên (*)" className="xl:w-3/12 lg:w-4/12 w-6/12 p-2" register={register} errors={errors} />
          <InputForm id="username" label="Tài khoản (*)" className="xl:w-3/12 lg:w-4/12 w-6/12 p-2" register={register} errors={errors} />
          <InputForm id="email" label="Email (*)" className="xl:w-3/12 lg:w-4/12 w-6/12 p-2" register={register} errors={errors} />
          <InputForm
            id="password"
            label="Mật khẩu (*)"
            type="password"
            className="xl:w-3/12 lg:w-4/12 w-6/12 p-2"
            register={register}
            errors={errors}
          />
          <InputForm id="address" label="Địa chỉ" className="xl:w-3/12 lg:w-4/12 w-6/12 p-2" register={register} errors={errors} />
          <SwitchForm id="status" label="Trạng thái (*)" className="xl:w-3/12 lg:w-4/12 w-6/12 p-2" register={register} />
          <TextAreaForm id="bio" label="Mô tả" className="w-full p-2" value={watch('bio')} onChange={(e) => setValue('bio', e.value)} />
        </div>
      </FormDetail>
    </Modal>
  );
};

export default DetailUser;
