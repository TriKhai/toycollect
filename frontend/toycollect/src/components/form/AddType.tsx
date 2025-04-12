import { useAppDispatch } from "@/hooks/reduxHook";
import { TypeProductForm } from "@/services/typeApi";
import { addType, fetchTypes } from "@/store/actions/typeAction";
import { closeModal } from "@/store/reducer/modalReducer";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

interface Field {
  id: string;
  label: string;
}

export const formSchema = yup.object({
  name: yup.string().required("Name is required"),
  theme: yup.string().required("Province is required"),
  description: yup.string().required("District is required"),
});

export default function AddType() {
  const dispatch = useAppDispatch();

  const fields: Field[] = [
    { id: "name", label: "Name" },
    { id: "theme", label: "Theme" },
    { id: "description", label: "Description" },
  ];

  const formik = useFormik<TypeProductForm>({
    initialValues: {
      name: "",
      theme: "",
      description: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      await dispatch(addType(values));
      await dispatch(fetchTypes());
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
            value={formik.values[field.id as keyof TypeProductForm]}
          />
          {formik.touched[field.id as keyof TypeProductForm] &&
            formik.errors[field.id as keyof TypeProductForm] && (
              <div className="text-red-500 text-sm">
                {formik.errors[field.id as keyof TypeProductForm]}
              </div>
            )}
        </div>
      ))}
      <button
        type="submit"
        className="mt-5 px-6 py-2 bg-black text-white rounded-lg hover:bg-green-400"
      >
        Add type
      </button>
    </form>
  );
}
