import axiosClient from "@/plugins/axios";
export interface Type {
  id: number;
  name: string;
  theme: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ResponseType {
  status: number;
  description: string;
  data: Type[];
  success: boolean;
}

export interface TypeProductForm {
  name: string;
  theme: string;
  description: string;
}

export const typeApi = {
  getAll: async (): Promise<Type[]> => {
    try {
      // Gọi API với params page và size
      const response = await axiosClient.get("/product-type");

      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error fetching type: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },

  addType: async (form: TypeProductForm): Promise<boolean> => {
    try {
      const response = await axiosClient.post("/product-type", form);
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error add product-type: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  updateType: async (id: number, form: TypeProductForm): Promise<boolean> => {
    try {
      const response = await axiosClient.put(`/product-type/${id}`, form);
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error edit product-type: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  deleteType: async (id: number): Promise<boolean> => {
    try {
      const response = await axiosClient.delete(`/product-type/${id}`, {
        params: { id },
      });
      return response.data.success; // Trả về data từ response
    } catch (error) {
      console.error("Error delete product-type: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
};
