"use client";
import { createRsvps } from "@/actions/rsvps";
import { Checkbox } from "@nextui-org/react";
import React, { useEffect, useState, useTransition } from "react";

const RsvpsCheckbox = ({ name, id }) => {
  const [checked, setChecked] = useState(() => {
    // Get initial state from localStorage
    return JSON.parse(window.localStorage.getItem(`event-${id}`)) || false;
  });
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(() => {
      setChecked(id);
      createRsvps(id);
      localStorage.setItem(`event-${id}`, JSON.stringify(!checked));
    });
  };
  useEffect(() => {
    // Sync localStorage state on component mount
    localStorage.setItem(`event-${id}`, JSON.stringify(checked));
  }, [checked, id]);
  return (
    <span className="text-gray-200/80">
      {!checked && (
        <>
          <Checkbox onClick={handleClick} />
          {isPending ? "loading.." : `to the ${name}`}
        </>
      )}
    </span>
  );
};

export default RsvpsCheckbox;
