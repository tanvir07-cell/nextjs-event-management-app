"use server";

import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "./db";

export const createTokenForUser = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET);
};

export const getUserFromToken = async (token: {
  name: string;
  value: string;
}) => {
  const payload = jwt.verify(token.value, process.env.JWT_SECRET) as {
    id: string;
  };
  const user = await prisma.user.findFirst({
    where: {
      id: payload.id,
    },
  });
  return user;
};

export const signIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }
  // if user exist then compare the password
  const isPasswordValid = await comparePW(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid User Credentials");
  }

  const token = createTokenForUser(user.id);
  return { user, token };
};

export const signUp = async ({
  email,
  password,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const hashedPw = await hashPW(password);
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPw,
    },
  });
  const token = createTokenForUser(user.id);
  return { user, token };
};

export const hashPW = (password: string) => {
  return bcrypt.hash(password, 10);
};

export const comparePW = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};
