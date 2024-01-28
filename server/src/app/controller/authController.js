import { signinValidation, signupValidation } from '@lib/validation';
import { createUserRp, signinRp } from '@repository';

export const getInfo = async (req, res) => {
  try {
    res.json({ status: true, data: { userInfo: req.userInfo } });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const signUp = async (req, res) => {
  try {
    const { error } = signupValidation(req.body);
    if (error) return res.status(400).json({ status: false, mess: error?.details[0]?.message });
    const { data, mess } = await createUserRp(req.body);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};

export const signIn = async (req, res) => {
  try {
    const { error } = signinValidation(req.body);
    if (error) return res.status(400).json({ status: false, mess: error?.details[0]?.message });
    const { data, mess } = await signinRp(req.body);
    if (data && !mess) res.json({ status: true, data });
    else res.status(400).json({ status: false, mess });
  } catch (error) {
    res.status(500).json({ status: false, mess: error.toString() });
  }
};
