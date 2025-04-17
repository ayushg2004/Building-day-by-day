// bascially routes folder contains files to guide server.js file that for which specific task it should go to which specific controller file and in which function to go for that specific task and then that function will do the task and return the response to the server.js file and then server.js file will send the response to the client side by cors api backend link fittend in frontend where that task is needed
// like in routes this file contain a route for auth function that it tells server.js file that for auth related tasks it should go to authController.js file and in that file it will go to the function signup or login according to the request and then that function will do the task and return the response to the server.js file and then server.js file will send the response to the client side by cors api backend link fittend in frontend where that task is needed

import express from "express";
import { login, signup } from "../controllers/authController.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

export default router;
