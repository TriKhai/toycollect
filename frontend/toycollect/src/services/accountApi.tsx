import { navigate } from "@/hooks/useAppNavigate";
import axiosClient from "@/plugins/axios";

export interface AccountInfor {
  id: number;
  username: string;
  role: string;
  token: string;
}

export interface UserLogin {
  username: string | null;
  token: string | null;
}

export interface AccountResponse {
  status: number;
  description: string;
  data: AccountInfor;
  success: boolean;
}

export interface Account {
  username: string;
  password: string;
}

export interface FormSignup {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface SignupResponse {
  status: number;
  description: string;
  data: string;
  success: boolean;
}

export interface UsernameForm {
  username: string;
}

export interface Acc {
  id: number;
  username: string;
  password: null;
  role: string;
  email: string;
  phone: null;
  createdAt: string;
  updatedAt: string;
  active: boolean;
}

export const accountApi = {
  login: async (account: Account): Promise<AccountInfor> => {
    try {
      const response = await axiosClient.post<AccountResponse>(
        "/account/login",
        account
      );

      if (response.data.data.role === "CUSTOMER") {
        navigate("/");
      } else if (response.data.data.role === "STAFF") {
        navigate("/admin");
      }

      console.log(response);
      return response.data.data;
    } catch (error) {
      console.error("Error login: ", error);
      throw error;
    }
  },

  signup: async (form: FormSignup): Promise<boolean> => {
    try {
      const response = await axiosClient.post<SignupResponse>(
        "/account/signup",
        form
      );
      if (response.status === 201 || response.status === 200) {
        navigate("/login");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error sign up: ", error);
      throw error;
    }
  },

  fetchRole: async (form: UsernameForm): Promise<string> => {
    try {
      const response = await axiosClient.post<SignupResponse>(
        "/account/get-role",
        form
      );

      return response.data.data;
    } catch (error) {
      console.error("Error fetching role: ", error);
      throw error;
    }
  },

  fetchAccounts: async (): Promise<Acc[]> => {
    try {
      const response = await axiosClient.get("/admin/users");
      return response.data.data;
    } catch (error) {
      console.error("Error fetching role: ", error);
      throw error;
    }
  },

  updateAccountActive: async (id: number): Promise<boolean> => {
    try {
      const response = await axiosClient.put(`/admin/account/${id}/active`);
      return response.data.data;
    } catch (error) {
      console.error("Error update account active: ", error);
      throw error;
    }
  },
};
