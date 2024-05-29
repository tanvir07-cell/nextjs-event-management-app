"use client";
import { Input } from "@nextui-org/react";
import { Button, Tooltip } from "@nextui-org/react";
import { CirclePlus } from "lucide-react";
import { useState, useTransition } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { createNewEvent } from "@/actions/event";

const Nav = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState("");

  function handleCreateEvent() {
    startTransition(() => {
      createNewEvent(name);
    });
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Create New Event
              </ModalHeader>
              <ModalBody>
                <Input
                  placeholder="Event Name"
                  variant="filled"
                  onChange={(e) => setName(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  isLoading={isPending}
                  color="primary"
                  onPress={onClose}
                  onClick={handleCreateEvent}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <nav className="h-[65px] border-b border-default-50 flex items-center px-6 gap-4">
        <div>
          <Tooltip content="New Event">
            <Button isIconOnly variant="ghost" size="sm" onPress={onOpen}>
              <CirclePlus size={16} />
            </Button>
          </Tooltip>
        </div>

        <div className="w-1/2">
          <Input size="sm" variant="faded" placeholder="search" />
        </div>
      </nav>
    </>
  );
};

export default Nav;
