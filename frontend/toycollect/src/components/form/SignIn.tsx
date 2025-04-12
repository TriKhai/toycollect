import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

const validationSchema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email. Example: example123@gmail.com")
    .required("Email is required"),
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  passwordConfirm: Yup.string()
    .trim()
    .oneOf([Yup.ref("password")], "Passwords do not match")
    .required("Confirm Password is required"),
  acceptTerms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

export default function SignIn() {
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
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              passwordConfirm: "",
              acceptTerms: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              toast.success("Registration Successful!", {
                description: "You have successfully signed up.",
              });
              console.log("Form Data:", values);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                {[
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
                ].map(({ id, label, placeholder, type }) => (
                  <div className="mb-6" key={id}>
                    <label className="block text-sm font-bold" htmlFor={id}>
                      {label}
                    </label>
                    <Field
                      id={id}
                      name={id}
                      type={type}
                      placeholder={placeholder}
                      className="border p-4 py-3 rounded-md mt-2 w-full text-black"
                    />
                    <ErrorMessage
                      name={id}
                      component="p"
                      className="text-red-500 ml-2"
                    />
                  </div>
                ))}

                <div className="mb-3 ml-2 flex items-center">
                  <Field
                    id="acceptTerms"
                    name="acceptTerms"
                    type="checkbox"
                    className="mr-3 scale-150 accent-black"
                  />
                  <label
                    htmlFor="acceptTerms"
                    className="text-md font-semibold"
                  >
                    I accept the terms and conditions
                  </label>
                </div>
                <ErrorMessage
                  name="acceptTerms"
                  component="p"
                  className="text-red-500 ml-2"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center hover:bg-[#3DBECC] font-bold hover:text-black w-full rounded-md bg-black text-white p-4 mb-4"
                >
                  <span>Sign Up</span> <ArrowUpRight />
                </button>
              </Form>
            )}
          </Formik>

          <div className="text-center font-mono relative my-6">
            <span className="relative z-10 bg-white px-4">or continue</span>
            <div className="absolute left-0 top-1/2 w-full border-t"></div>
          </div>

          <div className="pt-4 text-center">
            <span className="text-md font-semibold">
              Already have an account?
            </span>{" "}
            <a href="/login" className="hover:text-[#3DBECC] font-bold">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
