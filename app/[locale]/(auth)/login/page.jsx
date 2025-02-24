"use client";
import { useLoginMutation } from "@/lib/features/api/authApiSlice";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setUser } from "@/lib/features/slice/authSlice";
import Cookies from "js-cookie";
import { useToast } from "@/components/shared/toast/ToastContext";
import Facebook from "@/lib/facebook";
import Image from "next/image";
import Auth from "@/components/auth/auth";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { addToast } = useToast();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      if (res) {
        Cookies.set("user", JSON.stringify(res.user), {
          expires: new Date(new Date().getTime() + 5 * 60 * 60 * 1000),
          path: "/",
        });
        addToast("Login successful!", "success");
        dispatch(setUser(res.user));
        router.push("/dashboard");
      } else {
        addToast("Invalid email or password", "error");
      }
    } catch (error) {
      addToast(error.data?.message || "An error occurred", "error");
    }
  };

  return (
    <Auth>
      <div className="relative p-4 mx-auto w-full max-w-sm">
        <div className="flex justify-center items-center ">
          <Image
            className="w-auto h-14 lg:h-16"
            width={56}
            height={56}
            src="/android-chrome-192x192.png"
            alt="meseji"
            quality={100}
          />
        </div>
        <div className="mx-auto w-full">
          <h2 className="mt-2 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
            Login to Your Account
          </h2>
        </div>{" "}
        <div className="my-4 mx-auto">
          <form className="space-y-3" onSubmit={handleSubmit}>
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
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
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
                <div className="text-sm">
                  <Link
                    aria-label={"forget password"}
                    href="/#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                {isLoading ? (
                  <div className="size-6 animate-spin rounded-full border-4 border-gray-200 border-t-black" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <p className="flex mx-auto text-sm font-medium leading-tight text-center text-black">
              Not a member?
              <Link
                aria-label={"Sign up now"}
                className="font-semibold text-indigo-600 hover:text-indigo-500 ml-1"
                href="/register"
              >
                Sign up now
              </Link>
            </p>
          </div>
          {/* <div className="flex justify-center items-center mt-6">
              <Facebook />
            </div> */}
        </div>
      </div>
    </Auth>
  );
}
