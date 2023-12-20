import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const data = useSession();
  console.log(data)

  return (
    <nav className="py-2 px-4 flex bg-black text-white items-center justify-between">
      <div className="left flex items-center">
        <h1>Navbar</h1>
        <ul className="flex ml-8 gap-5 text-sm">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/posts">Posts</Link>
          </li>
        </ul>
      </div>
      <div className="right">
        {data.status === "authenticated" ? (
          <button
            className="bg-white px-4 py-1 rounded-md text-black"
            onClick={() => signOut()}
          >
            Logout
          </button>
        ) : (
          <button
            className="bg-white px-4 py-1 rounded-md text-black"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
