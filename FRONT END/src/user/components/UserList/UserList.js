import React from "react";
// Components
import UserItem from "../UserItem/UserItem";
// CSS
import "./UserList.css";

const UserList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No users found!</h2>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            name={user.name}
            image={user.image}
            placesCount={user.places}
          />
        );
      })}
    </ul>
  );
};

export default UserList;
