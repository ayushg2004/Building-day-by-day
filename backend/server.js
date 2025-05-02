import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";
import otpRoutes from "./routes/otpRoutes.js";
import googleAuthRoutes from "./routes/googleAuthRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// app.use("/api/auth", authRoutes);
// auth ke kaam ke liye keh diya ki bhai auth router se puch kha konse controller mai jana hh
app.use("/api", authRoutes); // ✅ simpler route prefix

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to a protected route!", user: req.user });
});

//  otp ke kaam ke liye keh diya ki bhai otp router se puch ki konse controller m ye kaam hoga
app.use("/api/otp", otpRoutes); // OTP route
app.use("/api/google-login", googleAuthRoutes); // Google login route

// mongoose is a JavaScript library that provides a schema-based solution to model your application data.
// means mongoose is language to write the schema for the data of mongoDB
// here we connect to the mongoDB database using mongoose and we can use atalas also web based mongoDB and we can use compass also for local mongoDB , we are using compass and with that no change in syntax of this schema writing
// here we put link  from .env to connect to our mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(5000, () => console.log("Backend running on port 5000"))
  )
  .catch((err) => console.error(err));

// nodemon we installed because it will automatically restart the server when we make changes in the code and save it so we dont have to restart the server manually every time we make changes in the code and save it
// nodemon is applied after installing it in the package.json file in the script section as "start": "nodemon server.js" and then we run the command "npm start" to start the server with nodemon and it will automatically restart the server when we make changes in the code and save it so we dont have to restart the server manually every time we make changes in the code and save it
