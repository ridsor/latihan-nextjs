import { getUserBy, setUser } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { sendEmail } from "@/actions/email";
import ResetPasswordEmailTemplate from "@/components/ResetPasswordEmailTemplate";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const user = await getUserBy(data.email, "email");

  if (!user)
    return NextResponse.json(
      {
        status: "fail",
        message: "User not found",
      },
      { status: 404 }
    );

  if (user.type == "google")
    return NextResponse.json(
      {
        status: "fail",
        message: "User cant change password",
      },
      { status: 404 }
    );

  const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1)).toISOString();

  const { id: userId, ...updateUser } = user;
  updateUser.resetPasswordToken = resetPasswordToken;
  updateUser.resetPasswordTokenExpiry = expiryDate;

  const newUser = await setUser(userId, updateUser);

  if (!newUser)
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to make a password reset request",
      },
      { status: 500 }
    );

  await sendEmail({
    from: "Ridsor <onboarding@resend.dev>",
    to: newUser.email,
    subject: "Test Reset Password",
    react: ResetPasswordEmailTemplate({
      email: newUser.email,
      resetPasswordToken: resetPasswordToken,
    }),
  });

  return NextResponse.json({
    status: "success",
    message: "Successfully made a password reset request",
    user: {
      id: userId,
      resetPasswordToken: resetPasswordToken,
      resetPasswordTokenExpiry: expiryDate,
    },
  });
}
