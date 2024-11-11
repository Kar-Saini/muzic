"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { CiUser } from "react-icons/ci";

const Appbar = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session.status !== "authenticated") {
      router.push("/signin");
    }
  }, []);

  return (
    <div className="w-full flex justify-between px-2 border-b-2 border-gray-100 pb-3">
      <div className="">
        <input
          className="w-64 border-2 border-gray-100  py-2 px-4 rounded-xl text-sm outline-none focus:outline-2 focus:outline-gray-400 outline-offset-1"
          type="text"
          placeholder="Search for creators, spaces"
        />
      </div>
      <div className="p-1 flex justify-center items-center gap-4 ">
        {session.status === "authenticated" && (
          <CiUser
            className="text-2xl hover:cursor-pointer"
            onClick={() => {
              router.push("/profile");
            }}
          />
        )}
        {session.status === "authenticated" ? (
          <button
            className="bg-black text-gray-100 px-4 py-2 rounded-xl text-sm hover:scale-105 transition"
            onClick={() => {
              signOut();
            }}
          >
            Signout
          </button>
        ) : (
          <button className="bg-black text-gray-100 px-4 py-2 rounded-xl text-sm hover:scale-105 transition">
            Signin
          </button>
        )}
      </div>
    </div>
  );
};

export default Appbar;
