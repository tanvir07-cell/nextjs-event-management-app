"use client";

import Drawer from "@/components/Drawer";
import { usePathname } from "next/navigation";

const Dashboard = ({ children, events, rsvps }) => {
  const path = usePathname();

  return (
    <Drawer>
      {path === "/dashboard" ? (
        <div className="flex w-full h-full">
          <div className="w-1/2 border-r border-default-50">{rsvps}</div>
          <div className="w-1/2 flex flex-col">
            <div className="border-b border-default-50 w-full h-1/2">
              {events}
            </div>
            <div className="w-full h-1/2">{children}</div>
          </div>
        </div>
      ) : (
        <div>{children}</div>
      )}
    </Drawer>
  );
};

export default Dashboard;
