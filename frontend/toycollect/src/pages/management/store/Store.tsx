import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { ProductDetail } from "@/services/productApi";
import { RootState } from "@/store/store";
import { PackagePlus, Trash2, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { openModal } from "../../../store/reducer/modalReducer";
import { deleteProduct, fetchAllStore } from "@/store/actions/productAction";
import { setProduct } from "@/store/reducer/storeAdminReducer";

export default function Store() {
  const dispatch = useAppDispatch();

  const { products } = useAppSelector(
    (state: RootState) => state.storeAdminReducer
  );
  useEffect(() => {
    dispatch(fetchAllStore());
  }, [dispatch]);

  const [query, setQuery] = useState("");
  const [keyQuery, setKeyQuery] = useState<string>("name");

  const filterProducts: ProductDetail[] =
    query.length > 0
      ? products.filter((product: ProductDetail) => {
          switch (keyQuery) {
            case "name":
              return product.name?.toLowerCase().includes(query.toLowerCase());

            case "type":
              return product.type?.name
                ?.toLowerCase()
                .includes(query.toLowerCase());

            case "theme":
              return product.type?.theme
                ?.toLowerCase()
                .includes(query.toLowerCase());

            case "promotion":
              return product.promotion?.name
                ?.toLowerCase()
                .includes(query.toLowerCase());

            case "brand":
              return product.brand?.name
                ?.toLowerCase()
                .includes(query.toLowerCase());

            default:
              return false; // Nếu không khớp keyQuery, loại bỏ
          }
        })
      : products;

  const handleAddProduct = () => {
    dispatch(
      openModal({
        title: "FORM ADD PRODUCT",
        componentName: "ADD_PRODUCT",
      })
    );
  };

  const handleEditProduct = (product: ProductDetail) => {
    dispatch(setProduct(product));
    dispatch(
      openModal({
        title: "FORM EDIT PRODUCT",
        componentName: "EDIT_PRODUCT",
      })
    );
  };

  const handleDeleteProduct = async (id: number) => {
    await dispatch(deleteProduct(id));
    dispatch(fetchAllStore());
  };

  return (
    <div className="w-full">
      <div className="w-full">
        <div className="flex p-4 gap-x-4 bg-white mb-6  rounded-lg shadow-md">
          <div>
            <button
              className="p-2 border rounded-md flex gap-2 hover:bg-[#13B2C4] hover:text-white"
              onClick={handleAddProduct}
            >
              <PackagePlus />
              <span>Add Product</span>
            </button>
          </div>
          <div className="relative w-[30vw]">
            <input
              type="text"
              placeholder="Search for product's name"
              className="w-full p-2 rounded-md border placeholder-gray-500 border-[#8785A2] focus:outline-none focus:border-[#0BAFC1] text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />

            <select
              id="keyQuery"
              className="border px-1 py-0.5 rounded absolute right-2 top-1.5 bg-[#19B4C5] text-white cursor-pointer"
              value={keyQuery}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setKeyQuery(e.target.value)
              }
            >
              <option value="name">Name</option>
              <option value="type">Type</option>
              <option value="theme">Theme</option>
              <option value="promotion">Voucher</option>
              <option value="brand">Brand</option>
            </select>
          </div>
        </div>

        <div className="p-4 shadow-md border-black rounded-xl bg-white ">
          <table className="table-fixed text-black w-full">
            <thead>
              <tr className="text-left uppercase">
                <th className="pb-4">name</th>
                <th className="pb-4">stock</th>
                <th className="pb-4">sold</th>
                <th className="pb-4">price</th>
                <th className="pb-4">version</th>
                <th className="pb-4">material</th>
                <th className="pb-4">type</th>
                <th className="pb-4">theme</th>
                <th className="pb-4">promotion</th>
                <th className="pb-4">brand</th>
                <th></th>
              </tr>
            </thead>
          </table>
          <div className="max-h-[65vh] overflow-y-auto w-full">
            <table className="table-fixed text-black w-full">
              <tbody className="">
                {filterProducts
                  .slice()
                  .reverse()
                  .map((product: ProductDetail) => (
                    <tr
                      className={`border-t text-left ${
                        product.stock === 0
                          ? "bg-red-100 text-red-700 font-bold px-2 rounded-md"
                          : ""
                      }`}
                      key={product.id}
                    >
                      <td className="pb-4 pt-2">{product.name}</td>
                      <td className={`pb-4 pt-2`}>{product.stock}</td>
                      <td className="pb-4 pt-2">{product.sold}</td>
                      <td className="pb-4 pt-2">{product.price}</td>
                      <td className="pb-4 pt-2">
                        {product.attributes.versionProduct}
                      </td>
                      <td className="pb-4 pt-2">
                        {product.attributes.material}
                      </td>
                      <td className="pb-4 pt-2">{product.type.name}</td>
                      <td className="pb-4 pt-2">{product.type.theme}</td>
                      <td className="pb-4 pt-2">{product.promotion.name}</td>
                      <td className="pb-4 pt-2">{product.brand.name}</td>
                      <td className="pb-4 pt-2 space-x-2">
                        <button
                          className="border rounded-md p-1 hover:bg-amber-300 bg-[#0BAFC1] text-white"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Wrench />{" "}
                        </button>
                        <button
                          className="border rounded-md p-1 hover:bg-red-300 bg-[#e02359] text-white"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 />{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
