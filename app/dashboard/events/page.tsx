import { getAllEventsForUser } from "@/utils/events";
import { getUserFromDb } from "@/utils/users";
import { Card, CardBody, CardHeader } from "@nextui-org/react";

const EventsPage = async () => {
  const user = await getUserFromDb();
  const events = await getAllEventsForUser(user?.id);
  console.log(events);
  return (
    <div className="container mx-auto max-w-[80%] ">
      <div className="grid grid-cols-3 gap-4">
        {events.map((event) => (
          <Card key={event.id} className="candy-mesh w-[100%] mt-10">
            <CardHeader>{event.name}</CardHeader>
            <CardBody>
              <p>
                StartOn:{" "}
                {new Date(event.createdAt).toLocaleDateString("en-us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
