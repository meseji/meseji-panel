"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

export function NavButton() {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      {/* {!user ? (
        <a
          href="/login"
          title="Login"
          className="inline-flex items-center mr-5 my-10 justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
          role="button"
        >
          Login
        </a>
      ) : (
        <a
          href="/dashboard"
          title="Dashboard"
          className="lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-lime-300 hover:text-black focus:text-black focus:bg-lime-300 font-semibold text-white bg-black rounded-full"
          role="button"
        >
          Dashboard
        </a>
      )} */}
      {!user ? (
        <Link
          href="/login"
          title="Login"
          className="lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-yellow-300 hover:text-black focus:text-black focus:bg-yellow-300 font-semibold text-white bg-black rounded-full"
          role="button"
        >
          Login
        </Link>
      ) : (
        <Link
          href="/dashboard"
          title="Dashboard"
          className=" lg:inline-flex items-center justify-center px-5 py-2.5 text-base transition-all duration-200 hover:bg-lime-400 hover:text-black focus:text-black focus:bg-lime-400 font-semibold text-white bg-black rounded-full"
          role="button"
        >
          Dashboard
        </Link>
      )}
    </>
  );
}
