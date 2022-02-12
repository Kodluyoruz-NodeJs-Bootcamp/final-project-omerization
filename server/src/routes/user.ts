import express from "express";
const router = express.Router();

import { signin, signup, googleSignIn, facebookSignIn } from "../controllers/user";

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/signin/google", googleSignIn);
router.post("/signin/facebook", facebookSignIn);

export default router;