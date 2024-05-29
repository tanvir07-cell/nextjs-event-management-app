import { memoize } from "nextjs-better-unstable-cache";
import prisma from "./db";
import { EventStatus, RsvpStatus } from "@prisma/client";

export const getRsvps = memoize(
  async (id) => {
    const specificUserEventRsvps = await prisma.event.findMany({
      where: {
        createdById: id,
        rsvps: {
          some: {},
        },
      },
      include: {
        rsvps: true,
      },
    });

    console.log(specificUserEventRsvps);
    return specificUserEventRsvps;
  },
  {
    persist: true,
    revalidateTags: () => ["dashboard:rsvps"],
  },
);
