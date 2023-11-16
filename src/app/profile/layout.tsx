type Props = {
  children: React.ReactNode;
};

export default function layuot({ children }: Props) {
  return (
    <>
      <nav className="bg-gray-800 fixed top-12 text-white p-4 right-0 h-screen w-60">
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Profile</li>
        </ul>
      </nav>
      <div>{children}</div>
    </>
  );
}
