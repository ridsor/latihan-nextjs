import { sendEmail } from "@/actions/email";
import ResetPasswordEmailTemplate from "@/components/ResetPasswordEmailTemplate";
import React from "react";

export default function page() {
  const handleSubmit = async (formmData: FormData) => {
    "use server";

    sendEmail({
      from: "Ridsor <onboarding@resend.dev>",
      to: "ridsorgamerz@gmail.com",
      subject: "Test Email",
      react: ResetPasswordEmailTemplate({
        firstName: "",
        resetPasswordToken: "",
      }),
    });
  };

  return (
    <main>
      <div className="container px-3">
        <h1 className="mt-2 mb-2">Lupa passowrd</h1>
        <form action={handleSubmit}>
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
