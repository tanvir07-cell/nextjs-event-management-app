"use client";

import { useFormState } from "react-dom";
import { Input, Button } from "@nextui-org/react";
import Link from "next/link";
import { register } from "@/actions/auth";
import SubmitBtn from "./SubmitBtn";
import { useRef } from "react";

const initial = {
  message: null,
  code: null,
  errors: [],
};

const SignupForm = () => {
  const [formState, action] = useFormState(register, initial);
  return (
    <form
      action={action}
      className="space-y-2 bg-content1 border border-default-100 shadow-lg rounded-md p-3 flex flex-col gap-2 "
    >
      <h3 className="my-4">Sign up</h3>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
        <Input size="lg" placeholder="First Name" name="firstName" required />
        <Input size="lg" placeholder="last Name" name="lastName" required />
      </div>

      <Input fullWidth size="lg" placeholder="Email" name="email" required />
      <Input
        name="password"
        fullWidth
        size="lg"
        type="password"
        placeholder="Password"
        required
      />
      <SubmitBtn>Register</SubmitBtn>
      <div>
        <Link href="/signin">{`Already have an account?`}</Link>
      </div>
      {formState.message && (
        <div className="text-red-400 text-sm">
          {formState.code === "P2002"
            ? "Email already exists"
            : formState.message}

          {formState?.errors?.length > 0 && (
            <div>
              {formState.errors.map((error) => (
                <div key={error.message}>
                  {error.message.includes("String") &&
                    `${error.path[0]} must contain at least 2 character(s)`}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </form>
  );
};

export default SignupForm;
