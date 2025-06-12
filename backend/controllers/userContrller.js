import validator from "validator";
import bcript from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import logger from "../logger/logger.js";

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

// -------- login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false, message: "All fields are required." });

    // ---- check if user exists
    const user = await User.findOne({ email });

    if (!user)
      return res.json({ success: false, message: "User does not exist." });

    // ----- check password
    const isMatch = await bcript.compare(password, user.password);
    if (!isMatch)
      return res.json({ success: false, message: "Incorrect password" });

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    logger.error(`Login error: ${error.message}`);
    res.json({ success: false, error: error.message });
  }
};

// -------- Register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ------ validate email format & strong password
    if (!name || !email || !password)
      return res.json({ success: false, message: "All fields are required." });

    if (!validator.isEmail(email))
      return res.json({ success: false, message: "Email not valid." });

    // if (!validator.isStrongPassword(password))
    //   return res.json({
    //     success: false,
    //     message: "Password not strong enough.",
    //   });

    if (password.length < 8)
      return res.json({
        success: false,
        message: "Password should be at least 8 characters",
      });

    // ---- check if user already exists
    const exist = await User.findOne({ email });

    if (exist)
      return res.json({ success: false, message: "User already exists." });

    // ----- Hasiing user password
    const salt = await bcript.genSalt(10);
    const hashedPassword = await bcript.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);

    res.json({ success: true, token });
    logger.info(`User registered: ${newUser._id}`, { email });
  } catch (error) {
    logger.error(`Registration error: ${error.message}`);
    res.json({ success: false, error: error.message });
  }
};

// -------- Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.json({ success: false, message: "All fields are required." });

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid credentials." });
    }
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
