import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const data = [
    {
      id: 1,
      name: "Sepatu",
      price: 10000,
    },
    {
      id: 2,
      name: "Sendal",
      price: 10000,
    },
  ];

  let response;

  if (id) {
    const find = data.find((x) => x.id === id);

    if (find) {
      response = {
        status: 200,
        message: "Success",
        data,
      };
    } else {
      response = {
        status: 404,
        message: "Data Not Found",
      };
    }
  } else {
    response = {
      status: 200,
      message: "Success",
      data,
    };
  }

  return NextResponse.json(response);
}
