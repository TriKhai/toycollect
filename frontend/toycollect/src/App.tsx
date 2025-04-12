import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate.tsx";
import UserProfile from "./tailwind_night/one/UserProfile.tsx";
import JobList from "./tailwind_night/two/JobList.tsx";
import Collections from "./tailwind_night/three/Collections.tsx";
import ReviewForm from "./tailwind_night/four/ReviewForm.tsx";
import Notification from "./tailwind_night/six/Notification.tsx";
import Subscriptions from "./tailwind_night/seven/Subscriptions.tsx";
import { UsersList } from "./tailwind_night/five/UsersList.tsx";
import JobPositions from "./tailwind_night/eight/JobPositions.tsx";
import AccountList from "./tailwind_night/nine/AccountList.tsx";
import Home from "./pages/home/Home.tsx";
import Test from "./templates/Test.tsx";
import Products from "./pages/products/Products.tsx";
import Detail from "./pages/detail/Detail.tsx";
import Profile from "./pages/profile/Profile.tsx";
import { setGlobalNavigate } from "./hooks/useAppNavigate.ts";
import ManagementTemplate from "./templates/ManagementTemplate.tsx";
import DashBoard from "./pages/management/dashboard/Dashboard.tsx";
import LogIn from "./pages/login/LogIn.tsx";
import SignUp from "./pages/login/SignUp.tsx";
import Store from "./pages/management/store/Store.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import CartPage from "./pages/cart/CartPage.tsx";
import OrdersPage from "./pages/management/orders/OrdersPage.tsx";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHook.ts";
import { localStore } from "./plugins/localStore.tsx";
import { fetchUserRole } from "./store/actions/accountAction.tsx";
import AccountPage from "./pages/management/account/AccountPage.tsx";
import VouchersPage from "./pages/management/voucher/VouchersPage.tsx";
import BrandsPage from "./pages/management/brand/BrandsPage.tsx";
import TypesPage from "./pages/management/type/TypesPage.tsx";

function App() {
  const navigate = useNavigate();
  setGlobalNavigate(navigate);
  const dispatch = useAppDispatch();
  // const { isAuthenticated, userRole } = useAppSelector(
  //   (state: RootState) => state.accountReducer
  // );

  useEffect(() => {
    const checkUserRole = async () => {
      if (!localStore.get("usr")) return;
      await dispatch(fetchUserRole());
    };

    checkUserRole();
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate(userRole === "STAFF" ? "/admin" : "/");
  //   }
  // }, []);

  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="detail">
          <Route path=":id" element={<Detail />}></Route>
        </Route>
        <Route
          path="profile"
          element={
            <ProtectedRoute component={Profile} allowedRole={["CUSTOMER"]} />
          }
        ></Route>
        <Route
          path="cart"
          element={
            <ProtectedRoute component={CartPage} allowedRole={["CUSTOMER"]} />
          }
        ></Route>
        <Route path="login" element={<LogIn />}></Route>
        <Route path="signup" element={<SignUp />}></Route>

        <Route path="one" element={<UserProfile />} />
        <Route path="two" element={<JobList />} />
        <Route path="three" element={<Collections />} />
        <Route path="four" element={<ReviewForm />} />
        <Route path="five" element={<UsersList />} />
        <Route path="six" element={<Notification />} />
        <Route path="seven" element={<Subscriptions />} />
        <Route path="eight" element={<JobPositions />} />
        <Route path="nine" element={<AccountList />} />
        <Route path="test" element={<Test />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute
            component={ManagementTemplate}
            allowedRole={["ADMIN", "STAFF"]}
          />
        }
      >
        <Route index element={<DashBoard />} />
        <Route path="store" element={<Store />}></Route>
        <Route path="orders" element={<OrdersPage />}></Route>
        <Route path="accounts" element={<AccountPage />}></Route>
        <Route path="vouchers" element={<VouchersPage />}></Route>
        <Route path="brands" element={<BrandsPage />}></Route>
        <Route path="types" element={<TypesPage />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
