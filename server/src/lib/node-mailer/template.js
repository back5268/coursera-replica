import { sendMail } from './config';

export const sendOtpSignupTemplate = ({ to, otp, username }) => {
  return sendMail({
    to,
    subject: `Đăng ký tài khoản Coursera Replica`,
    html: `<p>Bạn vừa gửi một yêu cầu quên mật khẩu trên tài khoản ${username}</p><p>Mã OTP của bạn là ${otp}, mã có hiệu lực trong vòng 5 phút.</p>`
  });
};

export const sendOtpForgotPasswordTemplate = ({ to, otp, username }) => {
  return sendMail({
    to,
    subject: `Quên mật khẩu Coursera Replica`,
    html: `<p>Bạn vừa gửi một yêu cầu quên mật khẩu trên tài khoản ${username}</p><p>Mã OTP của bạn là ${otp}, mã có hiệu lực trong vòng 5 phút.</p>`
  });
};
