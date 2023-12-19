export function registerValidate(data: {
  email: string;
  password: string;
  fullname: string;
}) {
  let result = [];
  if (!data.fullname) {
    result.unshift("Fullname cannot be empty");
  }
  if (!data.email) {
    result.unshift("Email cannot be empty");
  }
  if (!data.password) {
    result.unshift("Password cannot be empty");
  }
  return result;
}
