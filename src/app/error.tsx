"use client";

import Link from "next/link";

export default function Error() {
  return (
    <div className="px-2 flex items-center justify-center h-[500px] flex-col">
      <h1 className="my-3 text-3xl">Something went wrong!</h1>
      <Link
        href="/"
        className="px-4 rounded-md py-2 bg-black text-white block w-fit"
      >
        Back to home
      </Link>
    </div>
  );
}
