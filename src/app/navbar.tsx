import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();

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
        <button
          className="bg-white px-4 py-1 rounded-md text-black"
          onClick={() => router.push("/login")}>
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
