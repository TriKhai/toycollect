export const cookie = {
  /**
   * Lấy giá trị cookie theo tên.
   * @param name - Tên cookie cần lấy.
   * @returns Giá trị của cookie hoặc null nếu không tồn tại.
   */
  getCookie: (name: string): string | null => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim(); // Sử dụng const thay vì let vì giá trị không thay đổi
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length);
      }
    }
    return null;
  },

  /**
   * Đặt cookie với tên, giá trị và số ngày hết hạn.
   * @param name - Tên cookie.
   * @param value - Giá trị của cookie.
   * @param days - Số ngày cookie có hiệu lực (nếu không truyền sẽ là session cookie).
   */
  setCookie: (name: string, value: string, days?: number): void => {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  },

  /**
   * Xóa cookie theo tên.
   * @param name - Tên cookie cần xóa.
   */
  removeCookie: (name: string): void => {
    // Đặt thời gian hết hạn của cookie về quá khứ để trình duyệt xóa nó.
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
  },
};
