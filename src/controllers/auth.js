const Users = require("../models/auth");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
  console.log("Received request body:", req.body);
  const {
    firstName,
    lastName,
    mobileNumber,
    email,
    address,
    username,
    password,
  } = req.body;

  try {
    // Check if the email is already registered
    const existingEmail = await Users.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Check if the username is already registered
    const existingUsername = await Users.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Username is already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new Users({
      firstName,
      lastName,
      mobileNumber,
      email,
      address,
      username,
      password: hashedPassword,
    });

    // Save the new user to the database
    await newUser.save();

    res
      .status(201)
      .json({
        message: "User created successfully",
        redirectUrl: "/login",
        user: newUser,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await Users.findOne({ username });
    // console.log('User found:', user);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the provided password matches the stored password
    const isPasswordValid = await user.comparePassword(password.trim());
    console.log("Provided Password:", password);
    console.log("Stored Password:", user.password);
    console.log("Password Valid:", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // In a real-world scenario, you might want to generate a token for authentication.
    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Error during login", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await Users.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Users", error });
  }
};

module.exports = { createUser, getUsers, loginUser };
