"use client";

import { changeUserPassword } from "@/lib/firebase/service";
import { useState } from "react";

interface Props {
  token: string;
}
export default function FormResetPassword(props: Props) {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const message = await changeUserPassword(props.token, password);
    alert(message);
  };

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="form-input mb-2">
        <input
          type="password"
          className="px-3 focus:ring max-w-lg relative border border-[#ccc] focus:z-10 z-0 py-2 w-full rounded-b-md focus:ring-[#4F46E5] outline-none"
          placeholder="Password"
          name="password"
          onChange={(e) => setPassword(e.currentTarget.value)}
        />
      </div>
      <div className="form-input mb-2">
        <input
          type="password"
          className="px-3 focus:ring max-w-lg relative border border-[#ccc] focus:z-10 z-0 py-2 w-full rounded-b-md focus:ring-[#4F46E5] outline-none"
          placeholder="Konfirmasi Password"
          name="confirm_password"
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
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
