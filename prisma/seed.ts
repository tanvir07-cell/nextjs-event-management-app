import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      firstName: "user1",

      lastName: "user1",
      email: "user1@example.com",
      password: "password1",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: crypto.randomUUID(),
      firstName: "user2",
      lastName: "user2",
      email: "user2@example.com",
      password: "password2",
    },
  });

  // Create events
  const event1 = await prisma.event.create({
    data: {
      id: crypto.randomUUID(),
      name: "Event 1",
      startOn: new Date("2024-06-01T10:00:00Z"),
      createdById: user1.id,
      description: "Description for Event 1",
      streetNumber: 123,
      street: "Main St",
      zip: 12345,
      bldg: "Building A",
      isPrivate: false,
      status: "LIVE",
    },
  });

  const event2 = await prisma.event.create({
    data: {
      id: crypto.randomUUID(),
      name: "Event 2",
      startOn: new Date("2024-07-01T10:00:00Z"),
      createdById: user2.id,
      description: "Description for Event 2",
      streetNumber: 456,
      street: "Second St",
      zip: 67890,
      bldg: "Building B",
      isPrivate: true,
      status: "DRAFT",
    },
  });

  // Create attendees
  const attendee1 = await prisma.attendee.create({
    data: {
      id: crypto.randomUUID(),
      email: "attendee1@example.com",
      name: "Attendee One",
    },
  });

  const attendee2 = await prisma.attendee.create({
    data: {
      id: crypto.randomUUID(),
      email: "attendee2@example.com",
      name: "Attendee Two",
    },
  });

  // Create RSVPs
  await prisma.rsvp.create({
    data: {
      id: crypto.randomUUID(),
      attendeeId: attendee1.id,
      eventId: event1.id,
      status: "GOING",
    },
  });

  await prisma.rsvp.create({
    data: {
      id: crypto.randomUUID(),
      attendeeId: attendee2.id,
      eventId: event2.id,
      status: "MAYBE",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
