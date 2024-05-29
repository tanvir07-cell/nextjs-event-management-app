import "server-only";

import { cookies } from "next/headers";
import { COOKIE_NAME } from "./constants";
import { getUserFromToken } from "./authDb";
import { cache } from "react";

export const getUserFromDb = cache(async () => {
  const getTokenFromCookie = cookies().get(COOKIE_NAME) as {
    name: string;
    value: string;
  };
  const user = await getUserFromToken(getTokenFromCookie);

  console.log("user");
  return user;
});
