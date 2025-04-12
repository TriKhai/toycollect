import axiosClient from "@/plugins/axios";
import axios from "axios";
import { toast } from "sonner";

export interface Product {
  id: number;
  name: string;
  stock: number;
  price: number;
  image: string;
  discount: number;
}

export interface ProductPage {
  products: Product[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // Current page (zero-based)
}

// ProductDetail
export interface ProductDetail {
  id: number;
  name: string;
  manufactureDate: string;
  stock: number;
  description: string;
  price: number;
  image: string;
  dimetions: Dimetions;
  sold: number;
  attributes: Attributes;
  type: Type;
  promotion: Promotion;
  brand: Brand;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface Attributes {
  color: string | null;
  rarity: string | null;
  material: string | null;
  versionProduct: string | null;
  ageRecommendation: number | null;
}

export interface Brand {
  name: string | null;
  address: Address | null;
  contact: Contact | null;
}

export interface Address {
  province: string | null;
  district: string | null;
  commune: string | null;
  street: string | null;
  country: string | null;
}

export interface Contact {
  phone: string | null;
  email: string | null;
}

export interface Dimetions {
  length: number | null;
  width: number | null;
  height: number | null;
  weight: number | null;
}

export interface Promotion {
  name: string | null;
  description: string | null;
  percent: number | null;
}

export interface Type {
  name: string;
  theme: string;
  description: string;
}

export interface ProductResponse {
  status: number;
  description: string;
  data: ProductPage;
  success: boolean;
}

export interface ProductDetailResponse {
  status: number;
  description: string;
  data: ProductDetail;
  success: boolean;
}

export interface ProductFormData {
  fileImage: File | null;
  name: string;
  manufactureDate: string;
  stock: number;
  description: string;
  price: number;
  color: string;
  rarity: string;
  material: string;
  versionProduct: string;
  ageRecommendation: number;
  length: number;
  width: number;
  height: number;
  weight: number;
  brandId: number | null;
  promotionId: number | null;
  typeId: number | null;
}

export interface CountData {
  totalProduct: number;
  totalOrder: number;
  totalAccount: number;
  totalProductInStock: number;
  totalProductSold: number;
  totalBrands: number;
  totalTypeProducts: number;
  totalVouchers: number;
  totalRevenues: number;
}

export interface Statistic {
  month: number;
  year: number;
  totalOrders: number;
  totalRevenue: number;
}

export const productApi = {
  getAllStore: async (): Promise<ProductDetail[]> => {
    try {
      // Gọi API với params page và size
      const response = await axiosClient.get("/admin/products");
      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  getAll: async (page: number, size: number): Promise<ProductPage> => {
    try {
      // Gọi API với params page và size
      const response = await axiosClient.get<ProductResponse>("/product", {
        params: { page, size },
      });

      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  getLastest: async (): Promise<Product[]> => {
    try {
      // Gọi API với params page và size
      const response = await axiosClient.get("/product/latest");
      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  getById: async (id: number): Promise<ProductDetail> => {
    try {
      // Gọi API với params page và size
      const response = await axiosClient.get<ProductDetailResponse>(
        "/product/get-detail",
        {
          params: { id },
        }
      );

      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error fetching product: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  addProduct: async (form: ProductFormData): Promise<boolean> => {
    try {
      // Gọi API với params page và size
      const response = await axiosClient.post("/product/add-product", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.data; // Trả về data từ response
    } catch (error) {
      console.error("Error create product: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  // TODO: SỬa lại
  updateProduct: async (
    id: number,
    form: ProductFormData
  ): Promise<boolean> => {
    try {
      // Gọi API với params page và size
      const res = await axiosClient.put(`/product/update-product/${id}`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);

      return true; // Trả về data từ response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("Update Product", {
            description: "Cannot update: error",
          });
        } else {
          console.error(
            `Error ${error.response?.status}:`,
            error.response?.data
          );
        }
      } else {
        console.error("Unexpected Error: ", error);
      }

      console.error("Error fetching product: ", error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<boolean> => {
    try {
      // Gọi API với params page và size
      await axiosClient.delete("/product/delete-product", {
        params: { id },
      });

      return true; // Trả về data từ response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          toast.error("Delete Product", {
            description: "Cannot delete: This product has associated orders.",
          });
        } else {
          console.error(
            `Error ${error.response?.status}:`,
            error.response?.data
          );
        }
      } else {
        console.error("Unexpected Error: ", error);
      }

      console.error("Error fetching product: ", error);
      throw error; // Ném lỗi để xử lý ở phía trên
    }
  },
  getCount: async (): Promise<CountData> => {
    try {
      const response = await axiosClient.get("/admin/count");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
    }
  },

  getStatistics: async (): Promise<Statistic[]> => {
    try {
      const response = await axiosClient.get("/admin/monthly");
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching products: ", error);
      throw error;
    }
  },
};
