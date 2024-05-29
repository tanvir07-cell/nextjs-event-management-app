"use client";

import { Layers3 } from "lucide-react";
import Link from "next/link";
import { Button } from "@nextui-org/react";
import { useTransition } from "react";
import { LogOut } from "@/actions/auth";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { route: "/dashboard", name: "Home" },
  { route: "/dashboard/events", name: "Events" },
  { route: "/dashboard/guests", name: "Guests" },
  { route: "/dashboard/activity", name: "Activity" },
  { route: "/dashboard/settings", name: "Settings" },
];

const getActivePath = (path: string, route: string) => {
  if (path === route) {
    return "bg-primary hover:bg-primary";
  }
  return "hover:bg-content1";
};

const Side = () => {
  const path = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="w-full h-full px-3 relative">
      <div className="mb-12">
        <figure className="w-[80px] pt-4">
          <div className="flex items-center justify-center gap-1">
            <span className="text-xl">EV</span>
            <Layers3 size={80} />
            <span className="text-xl">NT</span>
          </div>
        </figure>
      </div>
      <div>
        {links.map((link) => (
          <div className="w-full" key={link.route}>
            <Link href={link.route}>
              <div
                className={clsx(
                  "w-full h-full py-2 px-2 hover:bg-content1 rounded-lg",
                  getActivePath(path, link.route),
                )}
              >
                {link.name}
              </div>
            </Link>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full left-0 px-4">
        <Button
          isLoading={isPending}
          onClick={() => {
            startTransition(() => {
              LogOut();
            });
          }}
          fullWidth
          variant="ghost"
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default Side;
