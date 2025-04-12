import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { getByUsername } from "@/store/actions/orderAction";
import { fetchProfileUser } from "@/store/actions/userAction";
import { RootState } from "@/store/store";
import { useEffect } from "react";
import OrderList from "./OrderList";

export default function Profile() {
  const { userProfile, myOrders } = useAppSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProfileUser()).unwrap();
        await dispatch(getByUsername()).unwrap();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <div className="my-10 space-y-6 flex gap-4">
      <div className="flex flex-col text-black font-mono gap-4 items-center w-[20vw]">
        <div className="w-full rounded-2xl overflow-hidden relative group ">
          <img
            className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
            src={
              userProfile?.image
                ? userProfile.image
                : "https://embargenting.org.vn/wp-content/uploads/avatar-anime-2-960x960.jpg"
            }
            alt=""
          />
          <button className="cursor-pointer absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#363333] text-white px-4 py-2 rounded-lg transition-opacity duration-500 opacity-0 group-hover:opacity-100 hover:bg-[#8bcda6] shadow-sm">
            Change Image
          </button>
        </div>
        <div className="w-full flex flex-col">
          <h1 className="text-black text-2xl font-bold">
            {userProfile?.fullName ? userProfile.fullName : "Not updated yet"}
          </h1>
          <p>Gender: {userProfile?.gender ? "Nam" : "Nữ"}</p>
          <p>
            Day of birth:{" "}
            {userProfile?.dob ? userProfile.dob : "Not updated yet"}
          </p>

          <p>
            Address:{" "}
            {userProfile?.address &&
            (userProfile.address.street ||
              userProfile.address.commune ||
              userProfile.address.district ||
              userProfile.address.province ||
              userProfile.address.country)
              ? `${userProfile.address.street}, ${userProfile.address.commune}, ${userProfile.address.district}, ${userProfile.address.province}, ${userProfile.address.country}`
              : "Not updated yet"}
          </p>

          <button className="hover:text-red-500 border w-[200px]">
            Update Profile
          </button>
        </div>
      </div>
      {myOrders.length > 0 ? (
        <div className="text-black font-bold font-mono">
          <h1 className="text-2xl underline">Order History</h1>
          <div>
            <OrderList orders={myOrders} />
          </div>
        </div>
      ) : (
        <p className="text-black text-lg font-mono">You have no orders yet.</p>
      )}
    </div>
  );
}
