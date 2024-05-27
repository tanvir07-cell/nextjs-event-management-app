import { PropsWithChildren } from "react";

const AuthRootLayout = ({ children }: PropsWithChildren<{}>) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-full max-w-[50%] mx-auto">{children}</div>
    </div>
  );
};

export default AuthRootLayout;
