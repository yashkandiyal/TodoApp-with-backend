import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  User,
} from "@nextui-org/react";
import { useSelector } from "react-redux";

export default function Avatarr({ loggingOutUser }) {
  const username = useSelector((state) => state.user.username);
  return (
    <div className="flex items-center gap-2 mb-4">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar isBordered as="button" className="transition-transform" />
        </DropdownTrigger>

        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as {username}</p>
          </DropdownItem>

          <DropdownItem key="logout" color="danger" onClick={loggingOutUser}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
