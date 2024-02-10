export const initParams = { page: 1, limit: 10 };
export const statuses = [
  { label: 'Active', key: 1 },
  { label: 'Inactive', key: '0' }
];

export const userRoles = [
  { label: 'Admin', key: 'admin' },
  { label: 'Staff', key: 'staff' },
  { label: 'User', key: 'user' }
];

export const courseType = [
  { label: 'Ngoại ngữ', key: 1 },
  { label: 'CNTT - Lập trình', key: 2 },
  { label: 'Kỹ năng đời sống', key: 3 },
  { label: 'Thiết kế', key: 4 },
  { label: 'Thể thao - Sức khỏe', key: 5 },
  { label: 'Kinh doanh - Khởi nghiệp', key: 6 }
];

export const courseCharacteristic = [
  { label: 'Khóa học mới', key: 'isNew' },
  { label: 'Khóa học nổi bật', key: 'isHot' }
];

export const commentStatus = [
  { label: 'Chờ trả lời', key: 0 },
  { label: 'Đã tiếp nhận', key: 1 },
  { label: 'Đã xử lý', key: 2 }
];

export const logType = [
  { label: 'Đăng ký tài khoản', key: 1 },
  { label: 'Quên mật khẩu', key: 2 },
  { label: 'Thanh toán thành công', key: 3 },
  { label: 'Hoàn thành khóa học', key: 4 }
];

export const logStatus = [
  { label: 'Đang gửi', key: 0 },
  { label: 'Đã gửi', key: 1 },
  { label: 'Có lỗi', key: 2 }
];
