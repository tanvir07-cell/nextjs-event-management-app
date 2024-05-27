"use client";

import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import SubmitBtn from "./SubmitBtn";
import { useFormState } from "react-dom";
import { LogIn } from "@/actions/auth";

const initState = {
  message: null,
  code: null,
  errors: [],
};

const SigninForm = () => {
  const [formState, action] = useFormState(LogIn, initState);
  return (
    <form
      action={action}
      className="space-y-2 bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign in</h3>

      <Input
        fullWidth
        required
        size="lg"
        placeholder="Email"
        name="email"
        type="email"
      />
      <Input
        name="password"
        fullWidth
        required
        size="lg"
        type="password"
        placeholder="Password"
      />
      <SubmitBtn>Sign in</SubmitBtn>
      <div>
        <Link href="/signup">{`Don't have an account?`}</Link>
      </div>

      {formState.message && (
        <div className="text-red-400 text-sm">{formState.message}</div>
      )}

      {formState?.errors?.length > 0 && (
        <div>
          {formState.errors.map((error) => (
            <div key={error.message} className="text-red-400 text-sm">
              {error.message.includes("String") &&
                `${error.path[0]} must contain at least 6 character(s)`}
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default SigninForm;
