"use server";

import prisma from "@/utils/db";
import { getUserFromDb } from "@/utils/users";
import { revalidateTag } from "next/cache";

export async function createNewEvent(name) {
  const user = await getUserFromDb();
  await prisma.event.create({
    data: {
      name,
      createdById: user?.id,
      startOn: new Date(),
    },
  });

  revalidateTag("dashboard:events");
}
