import axiosClient from "@/plugins/axios";
export interface Brand {
  id: number;
  name: string;
  address: Address;
  contact: Contact;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  province: string;
  district: string;
  commune: string;
  street: string;
  country: string;
}

export interface Contact {
  phone: string;
  email: string;
}

export interface BrandForm {
  name: string;
  province: string;
  district: string;
  commune: string;
  street: string;
  country: string;
  phone: string;
  email: string;
}

export interface ResponseBrand {
  status: number;
  description: string;
  data: Brand[];
  success: boolean;
}

export const brandApi = {
  getAll: async (): Promise<Brand[]> => {
    try {
      // Gọi API với params page và size
      const response = await axiosClient.get("/brand");

      return response.data; // Trả về data từ response
    } catch (error) {
      console.error("Error fetching brand: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  addBrand: async (form: BrandForm): Promise<boolean> => {
    try {
      const response = await axiosClient.post("/brand", form);
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error add brand: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  updateBrand: async (id: number, form: BrandForm): Promise<boolean> => {
    try {
      const response = await axiosClient.put(`/brand/${id}`, form);
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error edit brand: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  deleteBrand: async (id: number): Promise<boolean> => {
    try {
      const response = await axiosClient.delete(`/brand/${id}`, {
        params: { id },
      });
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error delete brand: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
};
