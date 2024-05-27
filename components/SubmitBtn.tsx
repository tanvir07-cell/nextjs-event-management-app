"use client";

import { Button } from "@nextui-org/react";
import { PropsWithChildren } from "react";
import { useFormStatus } from "react-dom";

const SubmitBtn = ({ children, ...props }: PropsWithChildren<{}>) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" {...props} isLoading={pending}>
      {children}
    </Button>
  );
};

export default SubmitBtn;
