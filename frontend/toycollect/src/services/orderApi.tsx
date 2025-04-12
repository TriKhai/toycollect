import axiosClient from "@/plugins/axios";

export interface Order {
  username: string;
  purchaseMethod: string;
  status: string;
  products: OrderProduct[];
}

export interface OrderProduct {
  productId: number;
  quantity: number;
}

// export interface MyOrder {
//   id: number;
//   purchaseMethod: string;
//   status: string;
//   createdAt: Date;
//   updatedAt: Date;
//   customer: Customer;
//   products: Product[];
// }

export interface MyOrder {
  id: number;
  purchaseMethod: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
  products: Product[];
}

export interface Customer {
  id: number;
  fullName: string;
  gender: boolean;
  dob: string;
  image: string;
  address: Address;
}

export interface Address {
  province: string;
  district: string;
  commune: string;
  street: string;
  country: string;
}

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface TopSeller {
  customer: Customer;
  totalRevenue: number;
}

export const orderApi = {
  createOrder: async (reqBody: Order): Promise<boolean> => {
    try {
      const response = await axiosClient.post("/order", reqBody);
      return response.data; // Trả về data từ response
    } catch (error) {
      console.error("Error create order: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  getOrders: async (): Promise<MyOrder[]> => {
    try {
      const response = await axiosClient.get(`/admin/orders`);
      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error create order: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },

  getByUsername: async (username: string): Promise<MyOrder[]> => {
    try {
      const response = await axiosClient.get(`/order/${username}`);
      // console.log(response.data.data);
      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error create order: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },

  approveOrder: async (id: number): Promise<boolean> => {
    try {
      const response = await axiosClient.put(`/admin/order/${id}/status`);
      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error create order: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },

  fetchTopSeller: async (): Promise<TopSeller[]> => {
    try {
      const response = await axiosClient.get(`/admin/top-revenue`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetch top seller: ", error);
      throw error;
    }
  },
};
