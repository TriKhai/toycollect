import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { localStore } from "@/plugins/localStore";
import { AccountInfor } from "@/services/accountApi";
import { fetchUserRole, login, signup } from "@/store/actions/accountAction"; // Đảm bảo đường dẫn chính xác
import { cookie } from "@/plugins/cookies";
import { toast } from "sonner";

// Mở rộng state để bao gồm loading và error
export interface UserState {
  username: string | null;
  token: string | null;
  isAuthenticated: boolean;
  userRole: string | null;
}

const initialState: UserState = {
  username: localStore.get("usr") || null,
  token: localStore.get("token") || null,
  isAuthenticated: !!localStore.get("token"),
  userRole: cookie.getCookie("r"),
};

const accountSlice = createSlice({
  name: "accountReducer",
  initialState,
  reducers: {
    logOutAction: (state) => {
      state.username = null;
      state.token = null;
      state.isAuthenticated = false;
      state.userRole = null;
      localStore.remove("usr");
      localStore.remove("cart");
      localStore.remove("token");
      cookie.removeCookie("usr");
      cookie.removeCookie("token");
      cookie.removeCookie("r");
      toast.success("Login", {
        description: "Logout successful.",
      });
    },
    setUserRole: (state, action: PayloadAction<string>) => {
      state.userRole = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state: UserState, action: PayloadAction<AccountInfor>) => {
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.userRole = action.payload.role;
        state.isAuthenticated = true;
        localStore.set("token", action.payload.token);
        localStore.set("usr", action.payload.username);
        cookie.setCookie("usr", action.payload.username, 30);
        cookie.setCookie("token", action.payload.token, 30);
        cookie.setCookie("r", action.payload.role, 30);
        toast.success("Login", {
          description: "Login successful.",
        });
      }
    );
    builder.addCase(login.rejected, (state: UserState, action) => {
      state.username = null;
      state.token = null;
      toast.error("Login", {
        description: "Incorrect username or password.",
      });
      console.log("action", action);
    });

    builder.addCase(
      signup.fulfilled,
      (state: UserState, action: PayloadAction<boolean>) => {
        if (action.payload) {
          toast.success("Signup", {
            description: "Signup successful.",
          });
        } else {
          toast.error("Signup", {
            description: "Signup failed. Please try again.",
          });
        }
      }
    );

    // Xử lý signup thất bại
    builder.addCase(signup.rejected, () => {
      toast.error("Signup", {
        description: "Username or email already exists",
      });
    });

    // get role

    builder.addCase(
      fetchUserRole.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.userRole = action.payload;
        cookie.setCookie("r", action.payload, 30);
      }
    );
    builder.addCase(fetchUserRole.rejected, (state) => {
      state.userRole = null;
    });
  },
});

export const { logOutAction, setUserRole } = accountSlice.actions;
export default accountSlice.reducer;

// export const fetchUserRole = () => async (dispatch: AppDispatch) => {
//   try {
//     const username = localStore.get("usr");
//     if (username) {
//       const role = await accountApi.fetchRole({ username });
//       dispatch(setUserRole(role));
//     }
//   } catch (error) {
//     console.error("Failed to fetch user role:", error);
//   }
// };
