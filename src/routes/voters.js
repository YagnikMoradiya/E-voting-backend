import express from "express";
import { signIn, signUp } from "../controllers/voters.js";

const router = express.Router();

router.post('/signUp', signUp.validator, signUp.controller);

router.post('/signIn', signIn.validator, signIn.controller);

export default router;