"use server";
import prisma from "@/utils/db";
import { RsvpStatus } from "@prisma/client";
import { revalidateTag } from "next/cache";

export async function createRsvps(eventId: string) {
  await prisma.rsvp.create({
    data: {
      eventId,
      status: RsvpStatus.GOING,
    },
  });

  revalidateTag("dashboard:rsvps");
  revalidateTag("dashboard:attendees");
}
