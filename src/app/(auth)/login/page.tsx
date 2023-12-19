"use client";

import axios from "axios";
import Link from "next/link";

export default function Login() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, password } = e.currentTarget;

    const res = await axios.post("/api/auth/login", {
      email: email.value,
      password: password.value,
    });
  };

  return (
    <main>
      <section className="px-2">
        <div className="container">
          <div className="flex items-center justify-center h-screen min-h-fit w-full">
            <form
              method="POST"
              className="max-w-md w-full"
              onSubmit={handleLogin}>
              <h1 className="font-bold text-2xl mb-10 text-center">
                Sign in to your account
              </h1>
              <div className="form-inputs divide-y border [box-shadow:0_0_3px_1px_rgba(0,0,0,.1)] mb-10 rounded-md">
                <div className="form-input">
                  <input
                    type="text"
                    className="px-3 focus:px-[calc(12px-2px)] py-2 focus:py-[calc(8px-2px)] w-full rounded-t-md focus:border-[2px] outline-none border-[#4F46E5]"
                    placeholder="Email"
                    name="email"
                  />
                </div>
                <div className="form-input">
                  <input
                    type="password"
                    className="px-3 focus:px-[calc(12px-2px)] py-2 focus:py-[calc(8px-2px)] w-full rounded-b-md focus:border-[2px] outline-none border-[#4F46E5]"
                    placeholder="Password"
                    name="password"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full px-3 py-2 bg-[rgb(79,70,229)] text-white rounded-md font-bold hover:bg-[rgb(79,120,229)] text-base mb-10">
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
