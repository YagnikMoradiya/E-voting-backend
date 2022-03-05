import express from "express";
import { authenticateVoter, signIn, signUp } from "../controllers/voters.js";

const router = express.Router();

router.post('/signUp', signUp.validator, signUp.controller);

router.post('/signIn', signIn.validator, signIn.controller);

router.get('/authenticate', authenticateVoter.controller);

export default router;