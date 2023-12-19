"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = e.currentTarget;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.value,
        password: password.value,
        callbackUrl: "/dashboard",
      });

      if (res?.ok) {
        router.push("/dashboard");
      } else {
        console.error(res?.error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main>
      <section className="px-2">
        <div className="container">
          <div className="flex items-center justify-center h-screen min-h-fit w-full">
            <form
              method="POST"
              className="max-w-md w-full"
              onSubmit={handleLogin}
            >
              <h1 className="font-bold text-2xl mb-10 text-center">
                Sign in to your account
              </h1>
              <div className="form-inputs divide-y border [box-shadow:0_0_3px_1px_rgba(0,0,0,.1)] mb-10 rounded-md">
                <div className="form-input">
                  <input
                    type="text"
                    className="px-3 relative py-2 focus:ring z-0 focus:z-10 w-full rounded-t-md focus:ring-[#4F46E5] outline-none"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                <div className="form-input">
                  <input
                    type="password"
                    className="px-3 focus:ring relative focus:z-10 z-0 py-2 w-full rounded-b-md focus:ring-[#4F46E5] outline-none"
                    placeholder="Password"
                    name="password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-3 py-2 bg-[rgb(79,70,229)] text-white rounded-md font-bold hover:bg-[rgb(79,120,229)] text-base mb-10"
              >
                Sign in
              </button>
              <div className="text-center">
                <span>
                  Don&rsquo;t have an account?{" "}
                  <Link className="text-[#4F46E5]" href="/register">
                    sign up here
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
