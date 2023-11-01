import React, { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const UserDetails = () => {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      navigate("/");
    }
  }, [userData]);

  return (
    <div className="container">
      <h2>User Details</h2>
      {userData ? (
        <>
          <div className="d-flex w-100">
            <div className="d-flex w-50">
              <p className="text-gray">First Name:</p>
              <p className="bold">{userData.firstName}</p>
            </div>
            <div className="d-flex w-50">
              <p className="text-gray">Last Name:</p>
              <p className="bold">{userData.lastName}</p>
            </div>
          </div>
          <div className="d-flex w-100 pt-10">
            <div className="d-flex w-50">
              <p className="text-gray">DOB:</p>
              <p className="bold">{userData.dob}</p>
            </div>
            <div className="d-flex w-50">
              <p className="text-gray">Age:</p>
              <p className="bold">{userData.age}</p>
            </div>
          </div>
          <div className="d-flex w-100 pt-10">
            <div className="d-flex w-50">
              <p className="text-gray">Email:</p>
              <p className="bold">{userData.email}</p>
            </div>
            <div className="d-flex w-50">
              <p className="text-gray">Gender:</p>
              <p className="bold">{userData.gender}</p>
            </div>
          </div>
          <div className="d-flex pt-10">
            <p className="text-gray">Address:</p>
            <p className="bold">{`${userData.city}, ${userData.state}, ${userData.country}`}</p>
          </div>

          <div className="w-100 pt-10 d-flex justify-between " >
            <Link to="/" className="App-link">Back</Link>
            <Link to="/users-list" className="App-link">Users List</Link>
          </div>
        </>
      ) : (
        <p>No data</p>
      )}
    </div>
  );
};

export default UserDetails;
