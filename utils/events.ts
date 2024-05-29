import { memoize } from "nextjs-better-unstable-cache";
import prisma from "./db";

export const getAllEventsForUser = memoize(
  async (id) => {
    const events = await prisma.event.findMany({
      where: {
        createdById: id,
      },
    });
    return events;
  },
  {
    persist: true,
    revalidateTags: () => ["dashboard:events"],
  },
);
