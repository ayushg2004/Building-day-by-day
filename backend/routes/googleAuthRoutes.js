// routes/googleAuthRoutes.js
import express from "express";
import { handleGoogleLogin } from "../controllers/googleAuthController.js";

const router = express.Router();

// POST /api/google-login
router.post("/", handleGoogleLogin);

export default router;
