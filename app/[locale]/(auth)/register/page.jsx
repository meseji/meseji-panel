"use client";
import PhoneNumberInput from "@/components/dashboard/shared/phone-number";
import { useToast } from "@/components/shared/toast/ToastContext";
import { useRegisterMutation } from "@/lib/features/api/authApiSlice";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [register, { isLoading: Loading }] = useRegisterMutation();
  const router = useRouter();
  const { addToast } = useToast();

  const handleChange = (input) => {
    const { name, value } = input.target || {};
    if (name) {
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      console.error("Invalid input change detected");
    }

    setPasswordError("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    // Reset password error state whenever the user modifies the confirm password
    setPasswordError("");
  };

  // Validate passwords match
  const validatePasswords = () => {
    if (form.password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validatePasswords()) {
      try {
        const res = await register(form);
        if (res) {
          addToast("Registration successful!", "success");
        }
        router.push("/login");
      } catch (error) {
        addToast("An error occurred", "error");
      }
    }
  };

  return (
    <div className="flex h-screen flex-col justify-center px-6 lg:px-8 bg-slate-100 ">
      <div className="relative p-6 bg-white rounded-3xl mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center items-center">
          <Image
            className="w-auto h-14 lg:h-16"
            width={56}
            height={56}
            src="/android-chrome-192x192.png"
            alt="meseji"
            quality={100}
          />
        </div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-2 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            SignUp to Your Account
          </h2>
        </div>
        <div className="my-4 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  autoComplete="Name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <PhoneNumberInput
              label="Phone Number"
              placeholder="Enter phone number"
              value={form.phone_number}
              onChange={handleChange}
              name="phone_number"
              // error={error}
            />
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
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="current-password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={Loading}
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                {/* {!isLoading ? "Loading..." : ""} */}
                {Loading ? (
                  <div className="size-6 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="flex mx-auto text-sm font-medium leading-tight text-center text-black">
              Already member?
              <Link
                className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
                href="/login"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
