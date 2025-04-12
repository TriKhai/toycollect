import React from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { ProductFormData } from "@/services/productApi";
import { fetchBrands } from "@/store/actions/brandAction";
import { editProduct, fetchAllStore } from "@/store/actions/productAction";
import { fetchPromotions } from "@/store/actions/promotionAction";
import { fetchTypes } from "@/store/actions/typeAction";
import { closeModal } from "@/store/reducer/modalReducer";
import { RootState } from "@/store/store";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as yup from "yup";

const editFormSchema = yup.object({
  fileImage: yup
    .mixed<File>()
    .nullable()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value) return true; // Cho phép bỏ trống
      return ["image/jpeg", "image/png", "image/webp"].includes(value.type);
    }),

  name: yup.string().required("Name is required."),
  stock: yup.number().min(0, "Stock must be at least 0."),
  price: yup.number().positive("Price must be a positive number."),
});

export default function EditProduct() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchTypes());
    dispatch(fetchPromotions());
    // console.log("Formik Values:", formik.values);
  }, []);

  const { product } = useAppSelector(
    (state: RootState) => state.storeAdminReducer
  );
  const { brands } = useAppSelector((state: RootState) => state.brandReducer);
  const { types } = useAppSelector((state: RootState) => state.typeReducer);
  const { promotions } = useAppSelector(
    (state: RootState) => state.promotionReducer
  );

  const formik = useFormik<ProductFormData>({
    initialValues: {
      fileImage: null,
      name: product?.name || "",
      manufactureDate: product?.manufactureDate || "",
      stock: product?.stock || 1,
      description: product?.description || "",
      price: product?.price || 0,
      color: product?.attributes.color || "",
      rarity: product?.attributes.rarity || "",
      material: product?.attributes.material || "",
      versionProduct: product?.attributes.versionProduct || "",
      ageRecommendation: product?.attributes.ageRecommendation || 0,
      length: product?.dimetions.length || 0,
      width: product?.dimetions.width || 0,
      height: product?.dimetions.height || 0,
      weight: product?.dimetions.weight || 0,
      brandId: brands.find((b) => b.name === product?.brand.name)?.id || null,
      promotionId:
        promotions.find((p) => p.name === product?.promotion.name)?.id || null,
      typeId: types.find((t) => t.name === product?.type.name)?.id || null,
    },
    enableReinitialize: true, // Cho phép cập nhật initialValues khi product thay đổi
    validationSchema: editFormSchema,
    onSubmit: async (values) => {
      // console.log("Form submitted with values:", values);
      if (product?.id !== undefined) {
        await dispatch(editProduct({ id: product?.id, form: values }));
        await dispatch(fetchAllStore());
        console.log("Done");
      } else {
        console.error("Product ID is undefined!");
      }
      dispatch(closeModal());
    },
  });

  useEffect(() => {
    if (
      brands.length > 0 &&
      types.length > 0 &&
      promotions.length > 0 &&
      !formik.values.brandId
    ) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        brandId: prevValues.brandId || brands[0].id,
        promotionId: prevValues.promotionId || promotions[0].id,
        typeId: prevValues.typeId || types[0].id,
      }));
    }
  }, [brands, types, promotions]);

  return (
    <form
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl space-y-4"
      onSubmit={formik.handleSubmit}
      encType="multipart/form-data"
    >
      <label className="block">
        Name:
        <input
          type="text"
          name="name"
          className="mt-2 ml-2 border p-1 rounded-md w-lg"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500">{formik.errors.name}</p>
        )}
      </label>
      <div className="flex gap-4">
        <label className="block">
          Manufacture Date:
          <input
            type="date"
            name="manufactureDate"
            className="mt-2 ml-2 border p-1 rounded-md"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.manufactureDate}
          />
          {formik.touched.manufactureDate && formik.errors.manufactureDate && (
            <p className="text-red-500">{formik.errors.manufactureDate}</p>
          )}
        </label>

        <label className="block">
          Image:
          <input
            type="file"
            accept="image/*"
            className="mt-2 ml-2 border"
            onChange={(event) =>
              formik.setFieldValue(
                "fileImage",
                event.currentTarget.files?.[0] || null
              )
            }
          />
          {formik.errors.fileImage && (
            <p className="text-red-500">{formik.errors.fileImage}</p>
          )}
        </label>
      </div>
      <div className="flex gap-4">
        <label className="block">
          Stock:
          <input
            type="number"
            className="mt-2 ml-2 py-1 px-2 border w-[100px]"
            name="stock"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.stock}
          />
          {formik.touched.stock && formik.errors.stock && (
            <p className="text-red-500">{formik.errors.stock}</p>
          )}
        </label>
        <label className="block">
          Price:
          <input
            type="number"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="price"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.price}
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500">{formik.errors.price}</p>
          )}
        </label>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <label className="block">
          color:
          <input
            type="text"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="color"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.color}
          />
          {formik.touched.color && formik.errors.color && (
            <p className="text-red-500">{formik.errors.color}</p>
          )}
        </label>
        <label className="block">
          rarity:
          <input
            type="text"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="rarity"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.rarity}
          />
          {formik.touched.rarity && formik.errors.rarity && (
            <p className="text-red-500">{formik.errors.rarity}</p>
          )}
        </label>
        <label className="block">
          length:
          <input
            type="text"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="length"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.length}
          />
          {formik.touched.length && formik.errors.length && (
            <p className="text-red-500">{formik.errors.length}</p>
          )}
        </label>
        <label className="block">
          width:
          <input
            type="text"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="width"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.width}
          />
          {formik.touched.width && formik.errors.width && (
            <p className="text-red-500">{formik.errors.width}</p>
          )}
        </label>
        <label className="block">
          height:
          <input
            type="text"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="height"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.height}
          />
          {formik.touched.height && formik.errors.height && (
            <p className="text-red-500">{formik.errors.height}</p>
          )}
        </label>

        <label className="block">
          weight:
          <input
            type="text"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="weight"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.weight}
          />
          {formik.touched.weight && formik.errors.weight && (
            <p className="text-red-500">{formik.errors.weight}</p>
          )}
        </label>

        <label className="block">
          Age Recommendation:
          <input
            type="text"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="ageRecommendation"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.ageRecommendation}
          />
          {formik.touched.ageRecommendation &&
            formik.errors.ageRecommendation && (
              <p className="text-red-500">{formik.errors.ageRecommendation}</p>
            )}
        </label>

        <label className="block">
          version:
          <input
            type="text"
            className="mt-2 ml-2 py-1 px-2 border w-[150px]"
            name="versionProduct"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.versionProduct}
          />
          {formik.touched.versionProduct && formik.errors.versionProduct && (
            <p className="text-red-500">{formik.errors.versionProduct}</p>
          )}
        </label>
      </div>
      <div className="flex flex-col">
        <label className="block mb-1 font-semibold" htmlFor="type">
          Type:
        </label>
        <select
          name="typeId" // Đặt đúng key trong Formik
          id="type"
          className="border p-1 mb-2"
          onChange={(e) => formik.setFieldValue("typeId", e.target.value)}
          value={formik.values.typeId ?? ""}
        >
          {types.map((type) => (
            <option className="border" value={type.id} key={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <label className="block mb-1 font-semibold" htmlFor="brand">
          Brand:
        </label>
        <select
          name="brandId"
          id="brand"
          className="border p-1 mb-2"
          onChange={(e) => {
            formik.setFieldValue("brandId", e.target.value);
          }}
          value={formik.values.brandId ?? ""}
        >
          {brands.map((brand) => (
            <option className="border" value={brand.id} key={brand.id}>
              {brand.name}
            </option>
          ))}
        </select>

        <label className="block mb-1 font-semibold" htmlFor="promotion">
          Voucher:
        </label>
        <select
          name="promotionId" // Đặt đúng key trong Formik
          id="promotion"
          className="border p-1 mb-2"
          onChange={(e) => formik.setFieldValue("promotionId", e.target.value)}
          value={formik.values.promotionId ?? ""}
        >
          {promotions.map((promotion) => (
            <option className="border" value={promotion.id} key={promotion.id}>
              {promotion.name}
            </option>
          ))}
        </select>
      </div>
      <textarea
        name="description"
        placeholder="description"
        className="border rounded-md w-full p-2"
        rows={5}
        id=""
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
      ></textarea>
      <button
        type="submit"
        className="px-6 py-2 bg-black text-white rounded-lg hover:bg-green-400"
      >
        Submit
      </button>
    </form>
  );
}
