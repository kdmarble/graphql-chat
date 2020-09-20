import React, { useCallback } from "react";

const User = props => {
  const { users, email, name, selectedMail } = props;

  const selectUserFunction = useCallback(
    (mail, user) => {
      selectedMail(mail, user);
    },
    [selectedMail]
  );

  return (
    <div className="user-welcome" style={props.style}>
      <div className="user-heading">
        <p>Hello, {name}</p>
      </div>
      <div className="select-user">
        {users.map(item =>
          item.email !== email ? (
            <div
              key={item.id}
              className="users"
              onClick={() => selectUserFunction(item.email, item.username)}
            >
              {item.username}
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default User;
