import { getUserByEmail, setUser } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const data = await req.json();

  const user = await getUserByEmail(data.email);

  if (!user)
    return NextResponse.json(
      {
        status: "fail",
        message: "User not found",
      },
      { status: 404 }
    );

  const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const expiryDate = new Date(today.setDate(today.getDate() + 1));

  const { id: userId, ...updateUser } = user;

  const newUser = await setUser(userId, updateUser);

  if (!newUser)
    return NextResponse.json(
      {
        status: "fail",
        message: "Failed to make a password reset request",
      },
      { status: 500 }
    );

  return NextResponse.json({
    status: "success",
    message: "Successfully made a password reset request",
    user: {
      id: userId,
      ...newUser,
    },
  });
}
