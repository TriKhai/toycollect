import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { Acc } from "@/services/accountApi";
import {
  fetchAccounts,
  updateAccountActive,
} from "@/store/actions/accountAction";
import { RootState } from "@/store/store";
import { format } from "date-fns";
import { Info, PackagePlus } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function AccountPage() {
  const dispatch = useAppDispatch();
  const { accounts } = useAppSelector(
    (state: RootState) => state.storeAdminReducer
  );
  useEffect(() => {
    dispatch(fetchAccounts());
  }, []);

  const [query, setQuery] = useState("");
  const filters: Acc[] =
    query.length > 0
      ? accounts.filter((acc: Acc) => {
          return acc.username.toLowerCase().includes(query.toLowerCase());
        })
      : accounts;

  const handleActive = async (id: number) => {
    await dispatch(updateAccountActive(id));
    await dispatch(fetchAccounts());
  };

  return (
    <div className="w-full">
      <div className="p-4 bg-white rounded-lg shadow-md mb-6 flex gap-x-4">
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
              <th className="pb-4">Username</th>
              <th className="pb-4">Role</th>
              <th className="pb-4">Email</th>
              <th className="pb-4">Phone</th>
              <th className="pb-4">Created</th>
              <th className="pb-4">Status</th>
              <th className="pb-4">Action</th>
            </tr>
          </thead>
        </table>
        <div className="max-h-[65vh] overflow-y-auto w-full">
          <table className="table-fixed text-black w-full">
            <tbody className="">
              {filters
                .slice()
                .reverse()
                .map((account: Acc) => (
                  <tr className="border-t text-left " key={account.id}>
                    <td className="pb-4 pt-2">{account.username}</td>
                    <td className="pb-4 pt-2">{account.role}</td>
                    <td className="pb-4 pt-2">{account.email}</td>
                    <td className="pb-4 pt-2">{account.phone}</td>
                    <td className="pb-4 pt-2">
                      {format(
                        new Date(account.createdAt),
                        "dd/MM/yyyy HH:mm:ss"
                      )}
                    </td>

                    <td className="pb-4 pt-2">
                      {account.active ? "Active" : "Inactive"}
                    </td>
                    <td className="pb-4 pt-2 space-x-2">
                      <div className="flex gap-2">
                        <button className="border rounded-md p-1 hover:bg-amber-300 bg-[#0BAFC1] text-white">
                          <Info />{" "}
                        </button>
                        <button
                          className="px-4 py-1 text-white rounded-md transition duration-300 "
                          style={{
                            backgroundColor: account.active
                              ? "#F78FAB"
                              : "#06AEC0",
                          }}
                          onClick={() => handleActive(account.id)}
                        >
                          {account.active ? "Deactivate" : "Activate"}
                        </button>
                      </div>
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
