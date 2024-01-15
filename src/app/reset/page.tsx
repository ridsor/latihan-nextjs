import { redirect } from "next/navigation";
import FormResetPassword from "./FormResetPassword";
import { checkResetPasswordToken } from "@/lib/firebase/service";

type Props = {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function page(props: Props) {
  const token = props.searchParams.token || "";
  if (!token || !(await checkResetPasswordToken(token as string))) {
    redirect("/login");
  }

  return (
    <main>
      <div className="container px-3">
        <h1 className="mt-2 mb-2">Reset password</h1>
        <FormResetPassword token={token as string} />
      </div>
    </main>
  );
}
