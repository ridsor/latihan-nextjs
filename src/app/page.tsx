import TestEmailButton from "@/components/TestEmailButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latihan - Home",
  description: "Latihan menggunakan NextJS",
  authors: [{ name: "Ridsor", url: "http://localhost:3000" }],
  icons: {
    icon: "/react.ico",
  },
};

export default function Home() {
  return (
    <>
      <h1>Home Page</h1>
      <TestEmailButton />
    </>
  );
}
