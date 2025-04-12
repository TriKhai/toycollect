import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./reducer/rootReducer"; // file này sẽ tạo ở bước tiếp theo

export const store = configureStore({
  reducer: rootReducer,
  // Middleware mặc định là redux-thunk nên không cần cấu hình nếu không dùng thêm các middleware khác
});

// trích xuất type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
