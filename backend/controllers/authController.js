// in this controller folder we make different different files for different tasks we want to do in our project like authController.js for authentication related tasks like signup, login, etc. and we can use them in our project by importing them in the file where we want to use it
// and we can make more files in this folder for different tasks we want to do in our project like postController.js for post related tasks like creating, updating, deleting posts, etc. and we can use them in our project by importing them in the file where we want to use it
//  means for any task functioning we can make different files in this folder and we can use them in our project by importing them in the file where we want to use it  in this files we write proper logic code for fullfilling the task we want to do in our project and we can use them in our project by importing them in the file where we want to use it

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

//yha hmne asynchrnous function bnaya ki jab bhi signup ka frontend mai se data aya hmara as hmne 3 fields ka data bheja tha signup mai frontend se name ,email, password as a request(req) and our function will respond(res) to that
//**/jb is async function mai call kiya jayega frontend mai to tb async ke sth await lgega as promise will be made that within time you request is send to asyanc function await for respond  "await" is to handle async function to synchrnous to improve user experience and error handling also
export const signup = async (req, res) => {
  const { username, email, password, phone } = req.body;
  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ error: "Username or Email already taken" });
    }

    const hash = await bcrypt.hash(password, 10); // hashing my password by library bcrypt as in DB also no one can see real password as itwill be secured by hash
    const user = new User({ username, email, password: hash, phone }); //new entry created in mongoDB with username, email and password by taking schema from mpdels/User.js
    await user.save();

    // after saving user details in DB we send the email to the user for confirmation of registration
    // ✅ Send welcome email
    // we write this message here as after sign up we have to do this task, its backend code is written in utils
    // as utils contains supporting code file  for function running in controller to full fill them
    //  nodemailer is library and we have installed it in terminal by using npm install nodemailer for using mail functionality
    await sendEmail(
      email, // send to
      "Welcome to Ayush Gupta's SearchAPI app!", // subject
      `Hi ${username},\n\nWelcome! You've successfully registered on our platform with ${phone} as mobile number.\n\nThanks for joining us!` // message to be delivered to the user mail
    );

    // here last message of registered and mail send
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error during signup" });
  }
};

// doing login validations and checking if user is already registered or not and then checking if password is correct or not and then generating token for the user to access the protected routes in the app
// and then sending the token to the client side to use it in the app to access the protected routes in the app

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
};
