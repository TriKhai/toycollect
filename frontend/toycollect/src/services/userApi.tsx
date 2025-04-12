import axiosClient from "@/plugins/axios";

export interface UserProfile {
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

export interface UserProfileResponse {
  status: number;
  description: string;
  data: UserProfile;
  success: boolean;
}

export const userApi = {
  getProfile: async (): Promise<UserProfile> => {
    const response = await axiosClient.get<UserProfileResponse>(
      "/customer/profile"
    );
    return response.data.data; // Trả về thông tin người dùng
  },
};
