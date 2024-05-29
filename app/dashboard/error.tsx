"use client";

import { Button } from "@nextui-org/react";

const RsvpsError = ({ error, reset }) => {
  return (
    <div>
      <h2>Something bad happened :( </h2>
      <Button color="danger" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
};

export default RsvpsError;
