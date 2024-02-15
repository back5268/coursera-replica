export const signupValid = {
  fullName: 'string',
  username: 'string',
  otp: 'string',
  email: 'email',
  password: { type: 'string', min: '6' }
};

export const signinValid = {
  username: 'string',
  password: { type: 'string', min: '6' }
};

export const sendOtpAuthValid = {
  username: 'string',
  email: 'email'
};

export const confirmPasswordValid = {
  username: 'string',
  email: 'email',
  otp: 'string',
  password: { type: 'string', min: '6' }
};
