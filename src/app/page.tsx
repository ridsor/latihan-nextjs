import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Latihan - Home",
  description: "Latihan menggunakan NextJS",
};

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}
