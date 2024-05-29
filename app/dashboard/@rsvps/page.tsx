import { createRsvps } from "@/actions/rsvps";
import RsvpsCheckbox from "@/components/RsvpsCheckbox";
import { getAllEventsForUser } from "@/utils/events";
import { getRsvps } from "@/utils/rsvps";
import { getUserFromDb } from "@/utils/users";
import {
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Chip,
  Input,
} from "@nextui-org/react";
import Link from "next/link";

const statusColors = {
  maybe: "warning",
  going: "success",
  started: "primary",
  ended: "disabled",
  not_going: "danger",
};

const RsVpsPage = async () => {
  const user = await getUserFromDb();

  const data = await getRsvps(user.id);

  const events = await getAllEventsForUser(user.id);

  return (
    <>
      <div className=" p-4 flex justify-center">
        <div className="w-full">
          <h2 className="text-center text-xl">{`RSVPs`}</h2>
          <div className="rounded-md border border-default-100 my-8">
            {data.map((event) => {
              return (
                <div
                  key={event.id}
                  className="p-4 border-b border-default-100 flex justify-between"
                >
                  <div>
                    <h3>{event.name}</h3>
                    <p>{event.description}</p>
                  </div>
                  <div>
                    {event.rsvps.map((rsvp) => (
                      <Chip
                        key={rsvp.id}
                        color={statusColors[rsvp.status.toLowerCase()]}
                      >
                        {rsvp.status}
                      </Chip>
                    ))}
                    <Link href={`/events/${event.id}`}></Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {events.length > 0 && (
        <Card className="py-4 px-4 glass  candy-mesh ">
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start justify-center">
            <p className="text-xl  uppercase font-bold text-gray-200/90">
              Hey {user?.firstName} Are you Going?
            </p>
          </CardHeader>
          <CardBody className="overflow-visible py-2 space-y-3 mt-3">
            {events.length &&
              events.map((event) => {
                return (
                  <div
                    key={event.id}
                    className="flex items-center justify-between"
                  >
                    <RsvpsCheckbox name={event.name} id={event.id} />
                  </div>
                );
              })}
          </CardBody>
        </Card>
      )}
    </>
  );
};

export default RsVpsPage;
