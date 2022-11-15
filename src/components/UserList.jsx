const UserList = ({ listedUsers, selectedUser, deleteUser }) => {
  console.log(listedUsers);

  return (
    <div>
      <h1 className="userList-title">Created Users</h1>
      {listedUsers.length === 0 ? (
        <div>
          <h1 className="userList-usersEmpty">Empty users list</h1>
        </div>
      ) : (
        listedUsers.map((user) => (
          <div className="component-UserList">
            <div key={user.id} className="cardUser">
              <div className="cardData">
                <h2 className="cardData-name">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="cardData-email">{user.email}</p>
                <p className="cardData-birthday">{user.birthday}</p>
              </div>
              <div className="cardIcons">
                <i
                  onClick={() => selectedUser(user)}
                  className="fa-solid fa-pencil"
                ></i>
                <i
                  onClick={() => deleteUser(user)}
                  className="fa-solid fa-trash"
                ></i>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserList;
