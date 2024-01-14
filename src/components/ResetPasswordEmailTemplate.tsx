import React from "react";

type Props = {
  email: string;
  resetPasswordToken: string;
};

export default function ResetPasswordEmailTemplate({
  email,
  resetPasswordToken,
}: Props) {
  return (
    <div>
      <h1>
        Reset Password for <b>{email}</b>
      </h1>
      <p>
        To reset your password, click on this link and follow the instructions:
      </p>
      <a href={`http://localhost:3000/reset?token=${resetPasswordToken}`}>
        Click here to reset password
      </a>
    </div>
  );
}
