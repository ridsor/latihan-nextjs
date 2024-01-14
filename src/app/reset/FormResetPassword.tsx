"use client";

import React from "react";
export default function FormResetPassword() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    "use client";
    e.preventDefault();
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="form-input mb-2">
        <input
          type="password"
          className="px-3 focus:ring max-w-lg relative border border-[#ccc] focus:z-10 z-0 py-2 w-full rounded-b-md focus:ring-[#4F46E5] outline-none"
          placeholder="Password"
          name="password"
        />
      </div>
      <div className="form-input mb-2">
        <input
          type="password"
          className="px-3 focus:ring max-w-lg relative border border-[#ccc] focus:z-10 z-0 py-2 w-full rounded-b-md focus:ring-[#4F46E5] outline-none"
          placeholder="Konfirmasi Password"
          name="confirm_password"
        />
      </div>
      <div className="form-input">
        <button
          disabled={false}
          type="submit"
          className=" px-3 py-2 bg-black text-white rounded-md"
        >
          Kirim Permintaan
        </button>
      </div>
    </form>
  );
}
