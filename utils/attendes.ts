import { RsvpStatus } from "@prisma/client";
import prisma from "./db";
import { memoize } from "nextjs-better-unstable-cache";

export const attendes = memoize(
  async (id) => {
    const specificUserEventRsvps = await prisma.event.findMany({
      where: {
        createdById: id,
      },
      include: {
        rsvps: true,
      },
    });

    return specificUserEventRsvps;
  },
  {
    persist: true,
    revalidateTags: () => ["dashboard:attendees"],
    suppressWarnings: true,
    log: ["datacache", "verbose"],
    logid: "dashboard:attendees",
  },
);
