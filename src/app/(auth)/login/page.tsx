"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

export default function Login({ searchParams }: any) {
  const router = useRouter();

  const callbackUrl = useMemo(
    () =>
      searchParams.callbackUrl == "http://localhost:3000/"
        ? "http://localhost:3000/dashboard"
        : searchParams.callbackUrl,
    [searchParams]
  );

  const [loginLoading, setLoginLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleLoginWithGoogle = () =>
    signIn("google", {
      callbackUrl: callbackUrl,
      redirect: false,
    });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginLoading(true);
    setError("");

    const { email, password } = e.currentTarget;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: email.value,
        password: password.value,
        callbackUrl: callbackUrl,
      });

      if (res?.ok) {
        router.push(callbackUrl);
      } else {
        setLoginLoading(false);
        setError("Incorrect email and password");
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
              {error && (
                <ul className="flex flex-col gap-1 text-red-400 mb-5">
                  <li>{error}</li>
                </ul>
              )}
              <div className="form-inputs divide-y border [box-shadow:0_0_3px_1px_rgba(0,0,0,.1)] rounded-md">
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
              <Link
                href="/resetpassword"
                className="text-[#4F46E5] block mt-2 text-sm"
              >
                Lupa password
              </Link>
              <button
                disabled={loginLoading}
                className={`${
                  loginLoading
                    ? "bg-gray-400"
                    : "hover:bg-[rgb(79,120,229)] bg-[rgb(79,70,229)]"
                } w-full px-3 py-2 text-white rounded-md font-bold text-base my-4`}
              >
                {loginLoading ? "Loading..." : "Login"}
              </button>
              <hr />
              <button
                type="button"
                disabled={loginLoading}
                onClick={handleLoginWithGoogle}
                className={`${
                  loginLoading
                    ? "bg-gray-400"
                    : "hover:bg-[rgb(79,120,229)] bg-[rgb(79,70,229)]"
                } w-full px-3 py-2 text-white rounded-md font-bold text-base my-4`}
              >
                {loginLoading ? "Loading..." : "Login with Google"}
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
