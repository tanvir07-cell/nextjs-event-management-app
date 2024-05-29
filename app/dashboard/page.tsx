import { attendes } from "@/utils/attendes";
import { getUserFromDb } from "@/utils/users";

const getAttendesFromRsvps = async () => {
  const user = await getUserFromDb();

  const totalAttendes = await attendes(user.id);
  let rsvps = totalAttendes.map((event) => event.rsvps).flat();
  let attendees = rsvps.filter((rsvp) => rsvp.status === "GOING");
  return attendees;
};

const DashbaordPage = async () => {
  const totalAttendes = await getAttendesFromRsvps();
  return (
    <div className="w-full flex h-full justify-center items-center">
      <div>
        <h4 className="text-lg">Attendees</h4>
        <h2 className="text-6xl font-semibold my-8 text-center">
          {totalAttendes?.length}
        </h2>
      </div>
    </div>
  );
};

export default DashbaordPage;
