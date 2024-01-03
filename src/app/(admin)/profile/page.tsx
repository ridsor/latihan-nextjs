"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div>
      <h1>Profil</h1>
      <p>Nama : {session?.user?.fullname}</p>
      <p>Email : {session?.user?.email}</p>
    </div>
  );
}
