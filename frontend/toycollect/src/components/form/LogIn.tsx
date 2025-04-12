import { ArrowUpRight } from "lucide-react";
import * as yup from "yup";
import { useFormik } from "formik";
import { login } from "@/store/actions/accountAction";
import { Account } from "@/services/accountApi";
import { useAppDispatch } from "@/hooks/reduxHook";
import { useNavigate } from "react-router-dom";

// Định nghĩa Yup schema
const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function LogIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formLogin = useFormik<Account>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values: Account) => {
      dispatch(login(values));
      navigate("/");
    },
  });

  return (
    <div className="flex justify-center items-center">
      <div className="w-[40vw] py-12">
        <div className="flex flex-col items-center justify-center mb-6">
          <h1 className="text-4xl font-bold text-black">Login</h1>
          <p className="text-xl font-mono text-gray-600">
            Get started today by entering just a few details
          </p>
        </div>

        <div className="px-10 pt-10 pb-6 rounded-2xl bg-white text-black shadow-lg">
          <form onSubmit={formLogin.handleSubmit}>
            {(
              [
                {
                  id: "username",
                  label: "Username*",
                  placeholder: "Your username*",
                  type: "text",
                },
                {
                  id: "password",
                  label: "Password*",
                  placeholder: "Min. 8 characters",
                  type: "password",
                },
              ] as const
            ).map(({ id, label, placeholder, type }) => (
              <div className="mb-3" key={id}>
                <label
                  className="block text-sm font-bold text-black"
                  htmlFor={id}
                >
                  {label}
                </label>
                <input
                  id={id}
                  name={id}
                  type={type}
                  placeholder={placeholder}
                  className="border p-4 py-3 rounded-md mt-2 w-full text-black"
                  onChange={formLogin.handleChange}
                  onBlur={formLogin.handleBlur}
                  value={formLogin.values[id as keyof Account]}
                />
                {formLogin.touched[id as keyof Account] &&
                  formLogin.errors[id as keyof Account] && (
                    <p className="text-red-500 ml-2">
                      {formLogin.errors[id as keyof Account]}
                    </p>
                  )}
              </div>
            ))}

            <div className="flex justify-end mb-5 text-md text-gray-500 font-bold hover:text-[#3DBECC]">
              <a href="/forgot">Forget Password</a>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center hover:bg-[#3DBECC] font-bold hover:text-black w-full rounded-md bg-black text-white p-4 mb-4"
            >
              <span>Log in</span> <ArrowUpRight />
            </button>
          </form>

          <div className="text-center font-mono relative my-6 text-black">
            <span className="relative z-10 bg-white px-4 text-black">
              or continue
            </span>
            <div className="absolute left-0 top-1/2 w-full border-t"></div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-md font-semibold">
              Don't have an account?
            </span>{" "}
            <a href="/test" className="hover:text-[#3DBECC] font-bold">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
