import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Định nghĩa kiểu cho Modal
export interface ModalProps {
  isOpen: boolean;
  title?: string;
  componentName?: string;
}

// Định nghĩa kiểu cho State
export type ModalState = {
  modal: ModalProps;
};

// Trạng thái mặc định của Modal
const initialState: ModalState = {
  modal: {
    isOpen: false,
    title: "",
    componentName: "",
  },
};

// Tạo slice cho modal
const modalReducer = createSlice({
  name: "modalReducer",
  initialState,
  reducers: {
    // Action: Mở hoặc cập nhật nội dung Modal
    openModal: (state, action: PayloadAction<Partial<ModalProps>>) => {
      state.modal = {
        ...state.modal,
        ...action.payload,
        isOpen: true,
      };
    },
    // Action: Đóng Modal
    closeModal: (state) => {
      state.modal = { ...initialState.modal };
    },
  },
});

// Export actions và reducer
export const { openModal, closeModal } = modalReducer.actions;
export default modalReducer.reducer;
