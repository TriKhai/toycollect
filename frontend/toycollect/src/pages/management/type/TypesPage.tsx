import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { Type } from "@/services/typeApi";
import { deleteType, fetchTypes } from "@/store/actions/typeAction";
import { openModal } from "@/store/reducer/modalReducer";
import { setType } from "@/store/reducer/typeReducer";
import { RootState } from "@/store/store";
import { format } from "date-fns";
import { PackagePlus, Trash2, Wrench } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function TypesPage() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTypes());
  }, []);
  const { types } = useAppSelector((state: RootState) => state.typeReducer);
  const [query, setQuery] = useState("");

  const filterType: Type[] =
    query.length > 0
      ? types.filter((brand: Type) => {
          return brand.name.toLowerCase().includes(query.toLowerCase());
        })
      : types;

  const handleAdd = () => {
    dispatch(
      openModal({
        title: "FORM ADD PRODUCT TYPE",
        componentName: "ADD_PRODUCT_TYPE",
      })
    );
  };

  const handleEdit = (type: Type) => {
    dispatch(setType(type));
    dispatch(
      openModal({
        title: "FORM EDIT PRODUCT TYPE",
        componentName: "EDIT_PRODUCT_TYPE",
      })
    );
  };

  const handleDelete = async (id: number) => {
    await dispatch(deleteType(id));
    dispatch(fetchTypes());
  };

  return (
    <div className="w-full">
      <div className="p-4 bg-white rounded-lg shadow-md mb-6 flex gap-x-4">
        <div>
          <button
            className="p-2 border rounded-md flex gap-2 hover:bg-[#13B2C4] hover:text-white"
            onClick={handleAdd}
          >
            <PackagePlus />
            <span>Add Type</span>
          </button>
        </div>
        <div>
          <div className="relative w-[30vw]">
            <input
              type="text"
              placeholder="Search for type's name ..."
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
              <th className="pb-4">theme</th>
              <th className="pb-4">description</th>
              <th className="pb-4">create at</th>
              <th></th>
            </tr>
          </thead>
        </table>
        <div className="max-h-[65vh] overflow-y-auto w-full">
          <table className="table-fixed text-black w-full">
            <tbody className="">
              {filterType
                .slice()
                .reverse()
                .map((type: Type) => (
                  <tr className="border-t text-left " key={type.id}>
                    <td className="pb-4 pt-2">{type.name}</td>
                    <td className="pb-4 pt-2">{type.theme}</td>
                    <td className="pb-4 pt-2">{type.description}</td>
                    <td className="pb-4 pt-2">
                      {format(new Date(type.createdAt), "yyyy-MM-dd HH:mm:ss")}
                    </td>

                    <td className="pb-4 pt-2 space-x-2">
                      <button
                        className="border rounded-md p-1 hover:bg-amber-300 bg-[#0BAFC1] text-white"
                        onClick={() => handleEdit(type)}
                      >
                        <Wrench />{" "}
                      </button>
                      <button
                        className="border rounded-md p-1 hover:bg-red-300 bg-[#e02359] text-white"
                        onClick={() => handleDelete(type.id)}
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
