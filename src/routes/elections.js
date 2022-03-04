import express from "express";
import { registerElection } from "../controllers/elections.js";

const router = express.Router();

router.post('/register', registerElection.validator, registerElection.controller)

export default router;