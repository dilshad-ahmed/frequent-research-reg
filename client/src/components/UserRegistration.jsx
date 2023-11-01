import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import { Link, useNavigate } from "react-router-dom";

const UserRegistration = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    state: "",
    city: "",
    gender: "",
    dob: null,
    age: null,
  });

  const calculateAge = (dob) => {
    if (!dob) return null; // Handle the case where DOB is not provided
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if (
      today <
      new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    let inputValue = e.target.value;
    const inputName = e.target.name;
    if (inputName === "firstName" || inputName === "lastName") {
      inputValue = inputValue.replace(/[^A-Za-z]/g, "");
    }
    if (inputName === "dob") {
      const age = calculateAge(inputValue); // Calculate age
      setUser((user) => ({ ...user, age })); // Update the user state with age
    }

    setUser((user) => ({ ...user, [inputName]: inputValue }));
  };

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submitted User Data==>", user);
    // API call to save the data in database using fetch
    fetch("http://localhost:8000/api/v1/registration", requestOptions)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to save data");
        }
      })
      .then((data) => {
        console.log("Data saved successfully:", data);
        navigate("/user-details", { state: user });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCountryChange = (e) => {
    const selectedCountryCode = e.target.value;
    const selectedCountryObject = countries.find(
      (country) => country.isoCode === selectedCountryCode
    );

    if (selectedCountryObject) {
      setSelectedCountry(e.target.value);
      setSelectedState(""); // Reset state when country changes
      setUser((user) => ({
        ...user,
        country: selectedCountryObject.name,
        state: "",
      }));
    }
  };

  const handleStateChange = (e) => {
    const selectedStateCode = e.target.value;
    const selectedStateObject = states.find(
      (country) => country.isoCode === selectedStateCode
    );
    setSelectedState(e.target.value);
    setUser((user) => ({ ...user, state: selectedStateObject.name }));
  };

  const handleCityChange = (e) => {
    setUser((user) => ({ ...user, city: e.target.value }));
  };

  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const countryStates = State.getStatesOfCountry(selectedCountry);
      setStates(countryStates);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedCountry && selectedState) {
      const stateCities = City.getCitiesOfState(selectedCountry, selectedState);
      setCities(stateCities);
    } else {
      setCities([]);
    }
  }, [selectedCountry, selectedState]);

  return (
    <>
      <div className="container">
        <Link className="App-link" to={"/users-list"}>Users List</Link>
        <h2>User Registration</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="d-flex items-center">
            <input
              onChange={handleChange}
              value={user.firstName}
              className="form-input"
              name="firstName"
              type="text"
              pattern="[A-Za-z]+"
              placeholder="First Name"
              required
            />
            <input
              onChange={handleChange}
              value={user.lastName}
              className="form-input"
              name="lastName"
              type="text"
              pattern="[A-Za-z]+"
              placeholder="Last Name"
              required
            />
          </div>
          <input
            onChange={handleChange}
            value={user.email}
            className="form-input"
            name="email"
            type="email"
            placeholder="E-Mail"
            required
          />

          <div>
            <label>Select a Country:</label>
            <br />
            <select
              className="form-input"
              name="country"
              value={selectedCountry}
              onChange={handleCountryChange}
              required
            >
              <option value="">Select a country</option>
              {countries.map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>

            <label>Select a State:</label>
            <select
              className="form-input"
              name="state"
              value={selectedState}
              onChange={handleStateChange}
              required
            >
              <option value="">Select a state</option>
              {states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>

            <label>Select a City:</label>
            <select
              className="form-input"
              name="city"
              onChange={handleCityChange}
              required
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Gender  */}
          <div className="pt-6">
            <p>Your gender</p>
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                required
              />{" "}
              Male
            </label>{" "}
            <br />
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                required
              />{" "}
              Female
            </label>
            <br />
            <label>
              <input
                onChange={handleChange}
                type="radio"
                name="gender"
                value="other"
                checked={user.gender === "other"}
                required
              />{" "}
              Other
            </label>
          </div>
          <br />
          {/* DOB field */}
          <div className="pt-6">
            <p>Your Date of Birth</p>
            <input
              className="form-input"
              name="dob"
              onChange={handleChange}
              value={user.dob}
              type="date"
              max="2009-01-01"
              required
            />
          </div>

          {user?.age && <p>Your age is {user.age}</p>}
          <button className="btn-submit" type="submit">
            {" "}
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default UserRegistration;
