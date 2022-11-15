import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [listedUsers, setListedUsers] = useState([]);
  const [userToModify, setUserToModify] = useState(null);

  useEffect(() => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setListedUsers(res.data))
      .catch((error) => console.log(error.response?.data));
  }, []);

  const getUsers = () => {
    axios
      .get("https://users-crud1.herokuapp.com/users/")
      .then((res) => setListedUsers(res.data))
      .catch((error) => console.log(error.response?.data));
  };

  const selectedUser = (user) => setUserToModify(user);
  const deselectUser = () => setUserToModify(null);

  const deleteUser = (user) => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${user.id}
    `).then(() => getUsers() )
  }


  return (
    <div className="App">
      <UserForm getUsers={getUsers} userToModify={userToModify} deselectUser={deselectUser} />
      <UserList listedUsers={listedUsers} selectedUser={selectedUser} deleteUser={deleteUser} />
    </div>
  );
}

export default App;
