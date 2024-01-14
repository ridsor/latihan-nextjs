"use client";

import { useState } from "react";

export default function page() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const email = e.currentTarget.email.value;
    const json = JSON.stringify({
      email,
    });

    const response = await fetch("/api/user/resetpassword", {
      method: "POST",
      body: json,
    });

    setLoading(false);
    alert("Permintaan telah terkirim");
  };

  return (
    <main>
      <div className="container px-3">
        <h1 className="mt-2 mb-2">Lupa passowrd</h1>
        <form onSubmit={handleSubmit} method="post">
          <div className="form-input mb-2">
            <input
              type="email"
              className="px-3 focus:ring max-w-lg relative border border-[#ccc] focus:z-10 z-0 py-2 w-full rounded-b-md focus:ring-[#4F46E5] outline-none"
              placeholder="Email"
              name="email"
            />
          </div>
          <div className="form-input">
            <button
              disabled={loading}
              type="submit"
              className=" px-3 py-2 bg-black text-white rounded-md"
            >
              Kirim Permintaan
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
