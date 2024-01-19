import { Loading } from '@/components/base';
import { FormAuth, InputForm } from '@/components/form';
import { Button, CheckBox, Link } from '@/components/uiCore';
import { ConfirmPasswordValidation } from '@/lib/validation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const ConfirmPassword = () => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(ConfirmPasswordValidation)
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <FormAuth title="Confirm Password" subTitle="Nhập thông tin để tiếp tục">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <InputForm id="username" label="Tài khoản (*)" disabled register={register} errors={errors} />
          <InputForm id="token" label="Mã xác nhận (*)" register={register} errors={errors} />
          <InputForm id="password" label="Mật khẩu mới (*)" register={register} errors={errors} />
          <div className="mb-6 flex items-center justify-between">
            <CheckBox id="remember" label="Đồng ý điều khoản và dịch vụ" />
          </div>
        </div>
        <Button className="w-full flex gap-4" type="submit" disabled={loading}>
          {loading && <Loading size={4} severity="neutral" />}
          Submit
        </Button>
        <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">OR</p>
        </div>
        <div className="text-center">
          <p className="mt-2 text-md">
            <Link to="/auth/sign-in">
              Quay lại đăng nhập
            </Link>
          </p>
        </div>
      </form>
    </FormAuth>
  );
};

export default ConfirmPassword;
