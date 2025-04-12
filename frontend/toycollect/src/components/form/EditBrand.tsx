import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { BrandForm } from "@/services/brandApi";
import { editBrand, fetchBrands } from "@/store/actions/brandAction";
import { closeModal } from "@/store/reducer/modalReducer";
import { RootState } from "@/store/store";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";

interface Field {
  id: string;
  label: string;
}

export const addBrandFormSchema = yup.object({
  name: yup.string().required("Name is required"),
  province: yup.string().required("Province is required"),
  district: yup.string().required("District is required"),
  commune: yup.string().required("Commune is required"),
  street: yup.string().required("Street is required"),
  country: yup.string().required("Country is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10,11}$/, "Phone number must be 10-11 digits")
    .required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function EditBrand() {
  const dispatch = useAppDispatch();
  const { brand } = useAppSelector((state: RootState) => state.brandReducer);

  const fields: Field[] = [
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "street", label: "Street" },
    { id: "commune", label: "Commune" },
    { id: "district", label: "District" },
    { id: "province", label: "Province" },
    { id: "country", label: "Country" },
  ];

  const formik = useFormik<BrandForm>({
    initialValues: {
      name: brand?.name ?? "",
      province: brand?.address.province ?? "",
      district: brand?.address.district ?? "",
      commune: brand?.address.commune ?? "",
      street: brand?.address.street ?? "",
      country: brand?.address.country ?? "",
      phone: brand?.contact.phone ?? "",
      email: brand?.contact.email ?? "",
    },
    validationSchema: addBrandFormSchema,
    onSubmit: async (values) => {
      if (brand?.id !== undefined) {
        await dispatch(editBrand({ id: brand?.id, form: values }));
        await dispatch(fetchBrands());
      } else {
        console.error("Brand ID is undefined!");
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
            value={formik.values[field.id as keyof BrandForm]}
          />
          {formik.touched[field.id as keyof BrandForm] &&
            formik.errors[field.id as keyof BrandForm] && (
              <div className="text-red-500 text-sm">
                {formik.errors[field.id as keyof BrandForm]}
              </div>
            )}
        </div>
      ))}
      <button
        type="submit"
        className="mt-5 px-6 py-2 bg-black text-white rounded-lg hover:bg-green-400"
      >
        Edit brand
      </button>
    </form>
  );
}
