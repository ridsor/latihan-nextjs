"use client";
import { sendEmail } from "@/actions/email";
import React from "react";
import EmailTemplate from "./EmailTemplate";

export default function TestEmailButton() {
  const handleSubmit = async () => {
    sendEmail({
      from: "Ridsor <onboarding@resend.dev>",
      to: "ridsorgamerz@gmail.com",
      subject: "Test Email",
      react: EmailTemplate({ firstName: "Ryan" }),
    });
  };

  return (
    <div>
      <button
        onClick={handleSubmit}
        className="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg">
        Send Test Email
      </button>
    </div>
  );
}
