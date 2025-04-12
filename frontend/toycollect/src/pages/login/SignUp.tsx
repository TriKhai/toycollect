import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useAppDispatch } from "@/hooks/reduxHook";
import { useFormik } from "formik";
import { signup } from "@/store/actions/accountAction";
import { FormSignup } from "@/services/accountApi";

// Định nghĩa kiểu dữ liệu của form
type Form = {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  acceptTerms: boolean;
};

type FormData = {
  values: Form;
  errors: Omit<Form, "acceptTerms"> & { acceptTerms: string };
};

const signupSchema = yup.object({
  username: yup.string().trim().required("Username is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  email: yup
    .string()
    .trim()
    .email("Invalid email address")
    .required("Email is required"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

export default function SignUp() {
  const dispatch = useAppDispatch();
  const formSignup = useFormik<Form>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
      acceptTerms: false,
    },
    validationSchema: signupSchema,
    onSubmit: (values: Form) => {
      const form: FormSignup = {
        username: values.username,
        email: values.email,
        password: values.password,
        role: "CUSTOMER",
      };
      dispatch(signup(form));
      console.log(values);
    },
  });

  // const [formData, setFormData] = useState<FormData>({
  //   values: {
  //     username: "",
  //     email: "",
  //     password: "",
  //     passwordConfirm: "",
  //     acceptTerms: false,
  //   },
  //   errors: {
  //     username: "",
  //     email: "",
  //     password: "",
  //     passwordConfirm: "",
  //     acceptTerms: "",
  //   },
  // });

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { id, value, type, checked } = e.target;
  //   const field = id as keyof Form;

  //   const newValues = {
  //     ...formData.values,
  //     [field]: type === "checkbox" ? checked : value,
  //   };
  //   const newErrors = { ...formData.errors };

  //   newErrors[field] = "";

  //   // Kiểm tra rỗng
  //   if (value.trim() === "") {
  //     newErrors[field] = "This field is required";
  //   }

  //   // Kiểm tra email (example@gmail.com)
  //   if (type === "email" && value.length > 0) {
  //     const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  //     if (!emailRegex.test(value)) {
  //       newErrors[field] = "Invalid email. Example: example123@gmail.com";
  //     }
  //   }

  //   // Kiểm tra password (tối thiểu 8 ký tự)
  //   if (field === "password" && value.length < 8 && value.length > 0) {
  //     newErrors[field] = "Password must be at least 8 characters";
  //   }

  //   // Kiểm tra passwordConfirm (match với password)
  //   if (field === "passwordConfirm" && newValues["password"] !== value) {
  //     newErrors[field] = "Passwords do not match";
  //   }

  //   // Kiểm tra acceptTerms (đồng ý điều khoản)
  //   if (field === "acceptTerms" && !checked) {
  //     newErrors[field] = "You must accept the terms and conditions";
  //   }

  //   if (field === "acceptTerms" && !checked) {
  //     newErrors[field] = "You must accept the terms and conditions";
  //   }

  //   // setState
  //   if (Object.keys(formData.values).includes(id)) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       values: newValues,
  //       errors: newErrors,
  //     }));
  //   }
  // };

  // Xử lý khi submit form
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // Xét điều kiện khi submit

  //   const { values, errors } = formData;
  //   for (const key of Object.keys(values) as Array<keyof Form>) {
  //     if (values[key] === "") {
  //       toast.error("Error", {
  //         description: "Please fill in all required fields!",
  //       });
  //       return;
  //     }

  //     if (key === "acceptTerms" && !values.acceptTerms) {
  //       toast.error("Error", {
  //         description: "Please accept the terms!",
  //       });
  //       return;
  //     }
  //   }

  //   for (const key of Object.keys(errors) as Array<keyof Form>) {
  //     if (errors[key] !== "") {
  //       toast.error("Error", {
  //         description: "Please fix all errors before submitting!",
  //       });
  //       return;
  //     }
  //   }

  //   toast.success("Error", {
  //     description: "Sunday, December 03, 2023 at 9:00 AM",
  //   });
  // };

  return (
    <div className="flex justify-center items-center min-h-screen text-black">
      <div className="w-[40vw] py-12">
        <div className="flex flex-col items-center justify-center mb-6 text-black">
          <h1 className="text-4xl font-bold text-black">Create Your Account</h1>
          <p className="text-xl font-mono text-gray-600">
            Let's get started with Toycollect
          </p>
        </div>

        <div className="px-10 pt-10 pb-6 rounded-2xl bg-white shadow-lg">
          <form onSubmit={formSignup.handleSubmit}>
            {(
              [
                {
                  id: "username",
                  label: "Username*",
                  placeholder: "Your username*",
                  type: "text",
                },
                {
                  id: "email",
                  label: "Email*",
                  placeholder: "youremail@gmail.com",
                  type: "email",
                },
                {
                  id: "password",
                  label: "Password*",
                  placeholder: "Min. 8 characters",
                  type: "password",
                },
                {
                  id: "passwordConfirm",
                  label: "Confirm Password*",
                  placeholder: "Confirm password",
                  type: "password",
                },
              ] as const
            ).map(({ id, label, placeholder, type }) => (
              <div className="mb-6" key={id}>
                <label className="block text-sm font-bold" htmlFor={id}>
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  value={formSignup.values[id]}
                  onChange={formSignup.handleChange}
                  onBlur={formSignup.handleBlur}
                  className="border p-4 py-3 rounded-md mt-2 w-full text-black"
                />
                {formSignup.touched[id as keyof Form] &&
                  formSignup.errors[id as keyof Form] && (
                    <p className="text-red-500 ml-2">
                      {formSignup.errors[id as keyof Form]}
                    </p>
                  )}
              </div>
            ))}

            <div className="mb-3 ml-2">
              <input
                id="acceptTerms"
                type="checkbox"
                checked={formSignup.values.acceptTerms}
                onChange={formSignup.handleChange}
                className="mr-3 scale-150 accent-black"
              />
              <label htmlFor="acceptTerms" className="text-md font-semibold">
                I accept the terms and conditions
              </label>
              {formSignup.touched.acceptTerms &&
                formSignup.errors.acceptTerms && (
                  <p className="text-red-500 ml-2">
                    {formSignup.errors.acceptTerms}
                  </p>
                )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center hover:bg-[#3DBECC] font-bold hover:text-black w-full rounded-md bg-black text-white p-4 mb-4"
            >
              <span>Sign Up</span> <ArrowUpRight />
            </button>
          </form>

          <div className="text-center font-mono relative my-6">
            <span className="relative z-10 bg-white px-4">or continue</span>
            <div className="absolute left-0 top-1/2 w-full border-t"></div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-md font-semibold">
              Already have an account?
            </span>{" "}
            <NavLink to={"/login"} className="hover:text-[#3DBECC] font-bold">
              Log in
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
