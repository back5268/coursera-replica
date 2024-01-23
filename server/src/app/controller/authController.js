import { signinValidation, signupValidation } from '@/lib/validation';
import { createUserRp, signinRp } from '../repository';

export const signUp = async (req, res) => {
  const { error } = signupValidation(req.body);
  if (error) return res.status(400).json({ status: false, mess: error?.details[0]?.message });
  const { data, mess } = await createUserRp(req.body);
  if (data && !mess) res.status(200).json({ status: true, data });
  else res.status(400).json({ status: false, mess });
};

export const signIn = async (req, res) => {
  const { error } = signinValidation(req.body);
  if (error) return res.status(400).json({ status: false, mess: error?.details[0]?.message });
  const { data, mess } = await signinRp(req.body);
  if (data && !mess) res.status(200).json({ status: true, data });
  else res.status(400).json({ status: false, mess });
};
