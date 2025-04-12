export const localStore = {
  /**
   * Lấy dữ liệu dạng string từ localStorage.
   * @param key Tên key cần lấy dữ liệu.
   * @returns Giá trị của key hoặc null nếu không tồn tại.
   */
  get: (key: string): string | null => {
    return localStorage.getItem(key);
  },

  /**
   * Lưu dữ liệu dạng string vào localStorage.
   * @param key Tên key.
   * @param value Giá trị dạng string.
   */
  set: (key: string, value: string): void => {
    localStorage.setItem(key, value);
  },

  /**
   * Xóa dữ liệu của key khỏi localStorage.
   * @param key Tên key cần xóa.
   */
  remove: (key: string): void => {
    localStorage.removeItem(key);
  },

  /**
   * Xóa toàn bộ dữ liệu trong localStorage.
   */
  clear: (): void => {
    localStorage.clear();
  },

  /**
   * Lấy dữ liệu dạng JSON từ localStorage và parse thành object.
   * @param key Tên key cần lấy dữ liệu.
   * @returns Dữ liệu được parse thành object hoặc null nếu không tồn tại.
   */
  getJSON: <T,>(key: string): T | null => {
    const item = localStorage.getItem(key);
    if (item) {
      try {
        return JSON.parse(item) as T;
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
      }
    }
    return null;
  },

  /**
   * Chuyển object thành chuỗi JSON và lưu vào localStorage.
   * @param key Tên key.
   * @param value Giá trị cần lưu (object) với kiểu T.
   */
  setJSON: <T,>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error stringifying JSON to localStorage", error);
    }
  },
};
