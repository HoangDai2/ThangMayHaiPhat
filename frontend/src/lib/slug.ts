export const generateSlug = (text: string): string => {
  if (!text) return '';
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu thanh tiếng Việt
    .replace(/[đĐ]/g, 'd')           // Thay thế chữ đ/Đ thành d
    .replace(/[^a-z0-9\s-]/g, '')    // Loại bỏ ký tự đặc biệt
    .trim()
    .replace(/\s+/g, '-')            // Chuyển khoảng trắng thành gạch ngang
    .replace(/-+/g, '-');            // Loại bỏ các gạch ngang liên tiếp
};
