import { getUserBy } from "@/lib/firebase/service";

export async function registerValidate(data: {
  email: string;
  password: string;
  fullname: string;
}) {
  let result = [];
  if (!data.fullname) {
    result.unshift("Fullname cannot be empty");
  }

  const user = await getUserBy(data.email, "email");
  if (!data.email) {
    result.unshift("Email cannot be empty");
  }
  if (user) {
    result.unshift("Email already exists");
  }

  if (!data.password) {
    result.unshift("Password cannot be empty");
  }
  return result;
}
