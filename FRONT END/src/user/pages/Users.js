import React from "react";
// Components
import UserList from "../components/UserList/UserList";

const Users = () => {
  const USERS = [
    {
      id: "u1",
      name: "Ska",
      image:
        "https://creazilla-store.fra1.digitaloceanspaces.com/icons/7911322/avatar-icon-sm.png",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
};

export default Users;
