import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required."],
    validate: {
      validator: (value) => /^[A-Za-z]+$/.test(value),
      message: "Only alphabetic characters are allowed for the first name.",
    },
  },
  lastName: {
    type: String,
    required: [true, "Last name is required."],
    validate: {
      validator: (value) => /^[A-Za-z]+$/.test(value),
      message: "Only alphabetic characters are allowed for the last name.",
    },
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    validate: {
      validator: (value) =>
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value),
      message: "Invalid email address.",
    },
  },
  country: {
    type: String,
    required: [true, "Country is required."],
  },
  state: {
    type: String,
    required: [true, "State is required."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
  },
  gender: {
    type: String,
    required: [true, "Gender is required."],
  },
  dob: {
    type: Date,
    required: [true, "Date of Birth is required."],
  },
  age: {
    type: Number,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
