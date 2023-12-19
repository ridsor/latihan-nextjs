import { getData, getDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  let data;

  if (id) {
    data = await getDataById("products", id);

    if (data) {
      return NextResponse.json(
        {
          status: 200,
          message: "Success",
          data: data,
        },
        {
          status: 200,
        }
      );
    }
    return NextResponse.json(
      {
        status: 404,
        message: "Data Not Found",
      },
      {
        status: 404,
      }
    );
  }

  data = await getData("products");

  return NextResponse.json(
    {
      status: 200,
      message: "Success",
      data,
    },
    {
      status: 200,
    }
  );
}
