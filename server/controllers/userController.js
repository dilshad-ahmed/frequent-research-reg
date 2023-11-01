import User from "../model/userModel.js";

export const registerationUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    } = req.body;

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      country,
      state,
      city,
      gender,
      dob,
      age,
    });

    res.status(200).json({
      success: true,
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ _id: -1 });
    res.status(200).json({
      success: true,
      totalUsers: users?.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
