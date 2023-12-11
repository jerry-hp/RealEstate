import express from "express";
import { SignIn, SignUp, GoogleSignIn } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/sign-up", SignUp);
router.post("/sign-in", SignIn);
router.post("/google", GoogleSignIn);

export default router;
