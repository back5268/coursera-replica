export const staffMiddleware = async (req, res, next) => {
  if (!req.user || !['staff', 'admin'].includes(req.user.role))
    return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
  next();
};

export const adminMiddleware = async (req, res, next) => {
  if (!req.user || req.user.role !== 'admin')
    return res.status(400).json({ status: false, mess: 'Bạn không có quyền thực hiện tác vụ này!' });
  next();
};
