import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { Brand } from "@/services/brandApi";
import { deleteBrand, fetchBrands } from "@/store/actions/brandAction";
import { setBrand } from "@/store/reducer/brandReducer";
import { openModal } from "@/store/reducer/modalReducer";
import { RootState } from "@/store/store";
import { format } from "date-fns";
import { PackagePlus, Trash2, Wrench } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function BrandsPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchBrands());
  }, []);
  const { brands } = useAppSelector((state: RootState) => state.brandReducer);
  const [query, setQuery] = useState("");

  const filterBrands: Brand[] =
    query.length > 0
      ? brands.filter((brand: Brand) => {
          return brand.name.toLowerCase().includes(query.toLowerCase());
        })
      : brands;

  const handleAddBrand = () => {
    dispatch(
      openModal({
        title: "FORM ADD BRAND",
        componentName: "ADD_BRAND",
      })
    );
  };

  const handleEdit = (brand: Brand) => {
    dispatch(setBrand(brand));
    dispatch(
      openModal({
        title: "FORM EDIT BRAND",
        componentName: "EDIT_BRAND",
      })
    );
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteBrand(id));
    dispatch(fetchBrands());
  };

  return (
    <div className="w-full">
      <div className="p-4 bg-white rounded-lg shadow-md mb-6 flex gap-x-4">
        <div>
          <button
            className="p-2 border rounded-md flex gap-2 hover:bg-[#13B2C4] hover:text-white"
            onClick={handleAddBrand}
          >
            <PackagePlus />
            <span>Add Brand</span>
          </button>
        </div>
        <div>
          <div className="relative w-[30vw]">
            <input
              type="text"
              placeholder="Search for brand's name ..."
              className="w-full p-2 rounded-md border placeholder-gray-500 border-[#8785A2] focus:outline-none focus:border-[#0BAFC1] text-black"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
            />
          </div>
        </div>
      </div>
      <div className="p-4 shadow-md border-black rounded-xl bg-white ">
        <table className="table-fixed text-black w-full">
          <thead>
            <tr className="text-left uppercase">
              <th className="pb-4">name</th>
              <th className="pb-4">street</th>
              <th className="pb-4">commune</th>
              <th className="pb-4">district</th>
              <th className="pb-4">province</th>
              <th className="pb-4">country</th>
              <th className="pb-4">phone</th>
              <th className="pb-4">email</th>
              {/* <th className="pb-4">create at</th> */}
              <th></th>
            </tr>
          </thead>
        </table>
        <div className="max-h-[65vh] overflow-y-auto w-full">
          <table className="table-fixed text-black w-full">
            <tbody className="">
              {filterBrands
                .slice()
                .reverse()
                .map((brand: Brand) => (
                  <tr className="border-t text-left " key={brand.id}>
                    <td className="pb-4 pt-2">{brand.name}</td>
                    <td className="pb-4 pt-2">{brand.address.street}</td>
                    <td className="pb-4 pt-2">{brand.address.commune}</td>
                    <td className="pb-4 pt-2">{brand.address.district}</td>
                    <td className="pb-4 pt-2">{brand.address.province}</td>
                    <td className="pb-4 pt-2">{brand.address.country}</td>
                    <td className="pb-4 pt-2">{brand.contact.phone}</td>
                    <td className="pb-4 pt-2">{brand.contact.email}</td>
                    {/* <td className="pb-4 pt-2">
                      {format(new Date(brand.createdAt), "yyyy-MM-dd HH:mm:ss")}
                    </td> */}
                    <td className="pb-4 pt-2 space-x-2">
                      <button
                        className="border rounded-md p-1 hover:bg-amber-300 bg-[#0BAFC1] text-white"
                        onClick={() => handleEdit(brand)}
                      >
                        <Wrench />{" "}
                      </button>
                      <button
                        className="border rounded-md p-1 hover:bg-red-300 bg-[#e02359] text-white"
                        onClick={() => handleDelete(brand.id)}
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
  );
}
