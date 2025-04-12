import React, { useMemo } from "react";
import { X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { RootState } from "@/store/store";
import { closeModal } from "../../store/reducer/modalReducer";
import AddProduct from "../form/AddProduct";
import EditProduct from "../form/EditProduct";
import AddBrand from "../form/AddBrand";
import EditBrand from "../form/EditBrand";
import AddType from "../form/AddType";
import EditType from "../form/EditType";
import AddVoucher from "../form/AddVoucher";
import EditVoucher from "../form/EditVoucher";

type ComponentMap = {
  ADD_PRODUCT: React.FC;
  EDIT_PRODUCT: React.FC;
  ADD_BRAND: React.FC;
  EDIT_BRAND: React.FC;
  ADD_PRODUCT_TYPE: React.FC;
  EDIT_PRODUCT_TYPE: React.FC;
  ADD_VOUCHER: React.FC;
  EDIT_VOUCHER: React.FC;
  // Định nghĩa các component là React Function Component
};

const componentsLookUp: ComponentMap = {
  ADD_PRODUCT: AddProduct,
  EDIT_PRODUCT: EditProduct,
  ADD_BRAND: AddBrand,
  EDIT_BRAND: EditBrand,
  ADD_PRODUCT_TYPE: AddType,
  EDIT_PRODUCT_TYPE: EditType,
  ADD_VOUCHER: AddVoucher,
  EDIT_VOUCHER: EditVoucher,
};

const Modal = () => {
  const { isOpen, componentName, title } = useAppSelector(
    (state: RootState) => state.modalReducer.modal
  );
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện nổi bọt
  };

  // Render component tương ứng
  const renderComponent = useMemo(() => {
    if (componentName && componentName in componentsLookUp) {
      const SelectedComponent =
        componentsLookUp[componentName as keyof ComponentMap];
      return <SelectedComponent />;
    }
    return null;
  }, [componentName]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50" onClick={handleClose}>
      <div
        className="absolute right-0 top-0 bottom-0 w-2xl z-60 bg-white opacity-100 p-6 shadow-lg animate-slideInLeft"
        onClick={handleBackdropClick}
      >
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {title && (
          <h2 className="mb-4 text-xl font-semibold uppercase text-gray-800">
            {title}
          </h2>
        )}
        <hr />

        <div className="space-y-4 h-[90vh] overflow-y-auto">
          {renderComponent}
        </div>

        {/* <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handleClose}
            className="rounded-lg border px-4 py-2 text-gray-600 hover:bg-gray-100"
          >
            Đóng
          </button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
            Xác nhận
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default Modal;
