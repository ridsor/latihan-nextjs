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
      <button onClick={handleSubmit}>Send Test Email</button>
    </div>
  );
}
