import { registerValidate } from "@/helper/register";
import { register } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const req = await request.json();

  const validate = await registerValidate(req);
  if (validate.length > 0)
    return NextResponse.json(
      {
        status: "fail",
        message: "Validation failed",
        errors: validate,
      },
      { status: 400 }
    );

  const result = await register(req);

  if (result.status) {
    return NextResponse.json(
      {
        status: "success",
        message: result.message,
        user: req,
      },
      { status: 201 }
    );
  }
  return NextResponse.json(
    {
      status: "fail",
      message: result.message,
    },
    { status: 400 }
  );
}
