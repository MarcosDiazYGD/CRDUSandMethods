import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const UserForm = ({ getUsers, userToModify, deselectUser, deleteUser }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isVisible, setIsVisible] = useState(false);

  const changeVisible = () => {
    setIsVisible(!isVisible);
  };

  const clearForm = () => {
    reset({
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      birthday: "",
    });
  };

  useEffect(() => {
    reset(userToModify);
  }, [userToModify]);

  const submit = (data) => {
    if (userToModify) {
      axios
        .put(
          `https://users-crud1.herokuapp.com/users/${userToModify.id}/`,
          data
        )
        .then(() => {
          getUsers();
          deselectUser();
        })
        .catch((error) => console.log(error.response?.data));
    } else {
      axios
        .post(`https://users-crud1.herokuapp.com/users/`, data)
        .then(() => getUsers())
        .catch((error) => console.log(error.response?.data));
    }
  };

  return (
    <div className="component-UserForm">
      <h1 className="useForm-title">Create User</h1>

      <form onSubmit={handleSubmit(submit)} className="form">
        <div>
          <i className="fa-solid fa-user"></i>
          <input
            required
            placeholder="Firs Name"
            type="text"
            id="firstName"
            {...register("first_name")}
          />
          <input
            required
            placeholder="Last Name"
            type="text"
            id="lastName"
            {...register("last_name")}
          />
        </div>

        <div>
          <i className="fa-solid fa-envelope"></i>
          <input
            required
            placeholder="Email"
            type="text"
            id="email"
            {...register("email")}
          />
        </div>

        <div>
          <i className="fa-solid fa-lock"></i>
          <input
            required
            placeholder="Password "
            type={isVisible ? "text" : "password"}
            id="password"
            {...register("password")}
          />
          {isVisible ? (
            <i onClick={changeVisible} className="fa-regular fa-eye"></i>
          ) : (
            <i onClick={changeVisible} className="fa-regular fa-eye-slash"></i>
          )}
        </div>

        <div>
          <i className="fa-solid fa-calendar"></i>
          <input
            required
            placeholder="Birthday"
            type="date"
            id="birthday"
            {...register("birthday")}
          />
        </div>
        <div className="useForm-containerButtons">
          <button className="useForm-buttonSubmit">submit</button>
          <button className="useForm-buttonClear" type="button" onClick={clearForm}>
            clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
