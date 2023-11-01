import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the API when the component mounts
    fetch("http://localhost:8000/api/v1/users-list")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.users); // Set the users in state
        setLoading(false); // Set loading to false
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []); // The empty dependency array ensures this effect runs only once

  return (
    <div className="container">
      <Link className="App-link" to={"/"}> Back </Link>
      <h2>Users List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="list-style">
          {users.map((user, index) => (
            <div className="bg-gray mb-15 p-10">
              <li key={index}>
                <div className=" d-flex w-100">
                  <div className="d-flex w-50">
                    <p className="text-gray">First Name:</p>
                    <p className="bold">{user.firstName}</p>
                  </div>
                  <div className="d-flex w-50">
                    <p className="text-gray">Last Name:</p>
                    <p className="bold">{user.lastName}</p>
                  </div>
                </div>
                <div className="d-flex w-100 pt-10">
                  <div className="d-flex w-50">
                    <p className="text-gray">DOB:</p>
                    {/* <p className="bold">{user.dob}</p> */}
                    <p className="bold">{new Date(user.dob).toLocaleDateString()}</p>
                  </div>
                  <div className="d-flex w-50">
                    <p className="text-gray">Age:</p>
                    <p className="bold">{user.age}</p>
                  </div>
                </div>
                <div className="d-flex w-100 pt-10">
                  <div className="d-flex w-50">
                    <p className="text-gray">Email:</p>
                    <p className="bold">{user.email}</p>
                  </div>
                  <div className="d-flex w-50">
                    <p className="text-gray">Gender:</p>
                    <p className="bold">{user.gender}</p>
                  </div>
                </div>
                <div className="d-flex pt-10">
                  <p className="text-gray">Address:</p>
                  <p className="bold">{`${user.city}, ${user.state}, ${user.country}`}</p>
                </div>
                {/* <p>First Name: {user.firstName}</p>
              <p>Last Name: {user.lastName}</p>
              <p>Email: {user.email}</p>
              <p>Gender: {user.gender}</p>
              <p>City: {user.city}</p>
              <p>State: {user.state}</p>
              <p>Country: {user.country}</p>
              <p>DOB: {user.dob}</p>
              <p>Age: {user.age}</p>
              <hr /> */}
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UsersList;
