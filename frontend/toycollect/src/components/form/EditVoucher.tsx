import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { VoucherForm } from "@/services/promotionApi";
import { editVoucher, fetchPromotions } from "@/store/actions/promotionAction";
import { closeModal } from "@/store/reducer/modalReducer";
import { RootState } from "@/store/store";
import { format } from "date-fns";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

interface Field {
  id: string;
  label: string;
}

export const formSchema = yup.object({
  name: yup.string().required("Name is required"),
  percent: yup.number().min(0).max(100).required("Percent is required"),
  description: yup.string().required("Description is required"),
  startDate: yup.date().required("Start date is required"),
  endDate: yup.date().required("End date is required"),
});

export default function EditVoucher() {
  const dispatch = useAppDispatch();
  const { promotion } = useAppSelector(
    (state: RootState) => state.promotionReducer
  );

  const fields: Field[] = [
    { id: "name", label: "Name" },
    { id: "percent", label: "Theme" },
    { id: "description", label: "Description" },
  ];

  const formik = useFormik<VoucherForm>({
    initialValues: {
      name: promotion?.name ?? "",
      description: promotion?.description ?? "",
      percent: promotion?.percent ?? 0,
      startDate: promotion?.startDate
        ? format(new Date(promotion.startDate), "yyyy-MM-dd")
        : "",
      endDate: promotion?.endDate
        ? format(new Date(promotion.endDate), "yyyy-MM-dd")
        : "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      if (promotion?.id !== undefined) {
        await dispatch(editVoucher({ id: promotion?.id, form: values }));
        await dispatch(fetchPromotions());
      } else {
        console.error("Voucher ID is undefined!");
      }
      dispatch(closeModal());
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl space-y-4"
      encType="multipart/form-data"
    >
      {fields.map((field) => (
        <div key={field.id} className="flex items-center space-x-4">
          <label htmlFor={field.id} className="w-24">
            {field.label}:
          </label>
          <input
            id={field.id}
            type="text"
            className="border p-1 rounded-md flex-1"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values[field.id as keyof VoucherForm]}
          />
          {formik.touched[field.id as keyof VoucherForm] &&
            formik.errors[field.id as keyof VoucherForm] && (
              <div className="text-red-500 text-sm">
                {formik.errors[field.id as keyof VoucherForm]}
              </div>
            )}
        </div>
      ))}

      <div className="flex items-center space-x-4">
        <label htmlFor="startDate" className="w-24">
          Start Date:
        </label>
        <input
          id="startDate"
          type="date"
          className="border p-1 rounded-md flex-1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.startDate}
        />
        {formik.touched["startDate"] && formik.errors["startDate"] && (
          <div className="text-red-500 text-sm">
            {formik.errors["startDate"]}
          </div>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <label htmlFor="endDate" className="w-24">
          End Date:
        </label>
        <input
          id="endDate"
          type="date"
          className="border p-1 rounded-md flex-1"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.endDate}
        />
        {formik.touched["endDate"] && formik.errors["endDate"] && (
          <div className="text-red-500 text-sm">{formik.errors["endDate"]}</div>
        )}
      </div>

      <button
        type="submit"
        className="mt-5 px-6 py-2 bg-black text-white rounded-lg hover:bg-green-400"
      >
        Add type
      </button>
    </form>
  );
}
