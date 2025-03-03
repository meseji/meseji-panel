// "use client";
// import Auth from "@/components/auth/auth";
// import PhoneNumberInput from "@/components/dashboard/shared/phone-number";
// import { useToast } from "@/components/shared/toast/ToastContext";
// import { useRegisterMutation } from "@/lib/features/api/authApiSlice";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";

// export default function Page() {
//   const [form, setForm] = useState({
//     name: "",
//     phone_number: "",
//     email: "",
//     password: "",
//   });
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [register, { isLoading: Loading }] = useRegisterMutation();
//   const router = useRouter();
//   const { addToast } = useToast();

//   const handleChange = (input) => {
//     const { name, value } = input.target || {};
//     if (name) {
//       setForm((prevState) => ({
//         ...prevState,
//         [name]: value,
//       }));
//     } else {
//       console.error("Invalid input change detected");
//     }

//     setPasswordError("");
//   };

//   const handleConfirmPasswordChange = (e) => {
//     setConfirmPassword(e.target.value);
//     // Reset password error state whenever the user modifies the confirm password
//     setPasswordError("");
//   };

//   // Validate passwords match
//   const validatePasswords = () => {
//     if (form.password !== confirmPassword) {
//       setPasswordError("Passwords do not match");
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validatePasswords()) {
//       try {
//         const res = await register(form);
//         if (res) {
//           addToast("Registration successful!", "success");
//         }
//         router.push("/login");
//       } catch (error) {
//         addToast("An error occurred", "error");
//       }
//     }
//   };

//   return (
//     <Auth>
//       <div className="flex h-screen flex-col justify-center px-4 lg:px-6 ">
//         <div className="relative p-6 bg-white rounded-3xl sm:mx-auto sm:w-full sm:max-w-sm">
//           {/* <div className="flex justify-center items-center">
//             <Image
//               className="w-auto h-14 lg:h-16"
//               width={56}
//               height={56}
//               src="/android-chrome-192x192.png"
//               alt="meseji"
//               quality={100}
//             />
//           </div>
//           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//             <h2 className="mt-2 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
//               SignUp to Your Account
//             </h2>
//           </div> */}
//           <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//             <form className="space-y-3" onSubmit={handleSubmit}>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium leading-6 text-gray-900"
//                 >
//                   Email address
//                 </label>
//                 <div className="mt-2">
//                   <input
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                     className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>

//               <PhoneNumberInput
//                 label="Phone Number"
//                 placeholder="Enter phone number"
//                 value={form.phone_number}
//                 onChange={handleChange}
//                 name="phone_number"
//                 // error={error}
//               />
//               <div>
//                 <div className="flex items-center justify-between">
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     Password
//                   </label>
//                 </div>
//                 <div className="mt-2">
//                   <input
//                     id="password"
//                     name="password"
//                     type="password"
//                     value={form.password}
//                     onChange={handleChange}
//                     autoComplete="current-password"
//                     required
//                     className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <div className="flex items-center justify-between">
//                   <label
//                     htmlFor="confirm-password"
//                     className="block text-sm font-medium leading-6 text-gray-900"
//                   >
//                     Confirm Password
//                   </label>
//                 </div>
//                 <div className="mt-2">
//                   <input
//                     id="confirm-password"
//                     name="confirm-password"
//                     type="password"
//                     autoComplete="current-password"
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     required
//                     className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   disabled={Loading}
//                   className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
//                 >
//                   {/* {!isLoading ? "Loading..." : ""} */}
//                   {Loading ? (
//                     <div className="size-6 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
//                   ) : (
//                     "Sign Up"
//                   )}
//                 </button>
//               </div>
//             </form>
//             <div className="mt-6">
//               <p className="flex mx-auto text-sm font-medium leading-tight text-center text-black">
//                 Already member?
//                 <Link
//                   className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
//                   href="/login"
//                 >
//                   Login
//                 </Link>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Auth>
//   );
// }

"use client";
import Auth from "@/components/auth/auth";
import PhoneNumberInput from "@/components/dashboard/shared/phone-number";
import { useToast } from "@/components/shared/toast/ToastContext";
import { useRegisterMutation } from "@/lib/features/api/authApiSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { step1Schema, step2Schema } from "@/lib/utils/schemas";
import { cn } from "@/lib/utils/utils";
import { Button } from "@/components/dashboard/shared/ui/button";

export default function Page() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [register, { isLoading: Loading }] = useRegisterMutation();
  const router = useRouter();
  const { addToast } = useToast();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: step === 1 ? zodResolver(step1Schema) : zodResolver(step2Schema),
    defaultValues: formData,
  });

  const onSubmit = async (data) => {
    if (step === 1) {
      setFormData({ ...formData, ...data });
      setStep(2);
    } else if (step === 2) {
      const finalData = { ...formData, ...data };
      try {
        const res = await register(finalData);
        if (res) {
          addToast("Registration successful!", "success");
          router.push("/login");
        }
      } catch (error) {
        addToast("An error occurred", "error");
      }
    }
  };

  const onBack = () => {
    setStep(1);
  };

  return (
    <Auth>
      <div className="relative p-4 mx-auto w-full max-w-full md:max-w-sm lg:max-w-md">
        <div className="mx-auto w-full mb-8 space-y-2">
          <h2 className="text-start text-4xl font-semibold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
          <p className="text-xl text-start text-gray-600">
            Sign up to your account to continue
          </p>
        </div>

        <div className="mx-auto w-full space-y-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              {step === 1 && (
                <>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="email"
                            placeholder="hello@example.com"
                            autoComplete="email"
                            className="block w-full rounded-lg border-0 p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        )}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Password
                      </label>
                    </div>
                    <div className="mt-2">
                      <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="password"
                            placeholder="Password"
                            className="block w-full rounded-md border-0 p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          />
                        )}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                    </div>
                    <div className="mt-2">
                      <Controller
                        name="name"
                        control={control}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="text"
                            placeholder="John Doe"
                            className="block w-full rounded-md border-0 p-2 ps-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 sm:text-sm sm:leading-6"
                          />
                        )}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1 ">
                          {errors.name.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="phone_number"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Number
                      </label>
                    </div>
                    <div className="mt-2">
                      <Controller
                        name="phone_number"
                        control={control}
                        render={({ field }) => (
                          <PhoneNumberInput
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Enter phone number"
                            // label="Phone Number"
                          />
                        )}
                      />
                      {errors.phone_number && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone_number.message}
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <p className="text-muted-foreground text-start text-xs mt-4 mb-3">
              By signing up you agree to our{" "}
              <a className="underline hover:no-underline" href="#">
                Terms
              </a>
              .
            </p>
            <div className="flex justify-between ">
              {step > 1 && (
                <button
                  type="button"
                  onClick={onBack}
                  className="border text-black px-4 py-2 rounded-md font-semibold leading-6"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={Loading}
                className={cn(
                  " text-white px-4 py-2 rounded-md bg-black",
                  step === 1 &&
                    "flex w-full justify-center bg-black text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
                )}
              >
                {step === 1 ? "Next" : "Sign Up"}
              </button>
            </div>
          </form>

          <div className="before:bg-border after:bg-border flex items-center gap-3 before:h-px before:flex-1 after:h-px after:flex-1">
            <span className="text-muted-foreground text-xs">Or</span>
          </div>

          <Button variant="outline" disabled className="w-full">
            Continue with Google
          </Button>

          {step === 1 && (
            <div>
              <p className="text-center text-sm font-medium leading-tight mt-4 text-gray-600">
                Have and account?
                <Link
                  className="font-semibold text-indigo-400 hover:text-indigo-500 ml-1"
                  href="/login"
                >
                  Login
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </Auth>
  );
}
