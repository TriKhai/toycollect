import axiosClient from "@/plugins/axios";
export interface Promotion {
  id: number;
  name: string;
  description: string;
  percent: number;
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}
export interface ResponseType {
  status: number;
  description: string;
  data: Promotion[];
  success: boolean;
}

export interface VoucherForm {
  name: string;
  description: string;
  percent: number;
  startDate: string;
  endDate: string;
}

export const promotionApi = {
  getAll: async (): Promise<Promotion[]> => {
    try {
      // Gọi API với params page và size
      const response = await axiosClient.get("/promotion");

      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error fetching voucher: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },

  addVoucher: async (form: VoucherForm): Promise<boolean> => {
    try {
      const response = await axiosClient.post("/promotion", form);
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error add promotion: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  updateVoucher: async (id: number, form: VoucherForm): Promise<boolean> => {
    try {
      const response = await axiosClient.put(`/promotion/${id}`, form);
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error edit promotion: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  deleteVoucher: async (id: number): Promise<boolean> => {
    try {
      const response = await axiosClient.delete(`/promotion/${id}`, {
        params: { id },
      });
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error delete promotion: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
};
