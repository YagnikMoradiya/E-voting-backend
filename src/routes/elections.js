import express from "express";
import { getElections, registerElection } from "../controllers/elections.js";

const router = express.Router();

router.post('/register', registerElection.validator, registerElection.controller);

router.get('/getElections', getElections.validator, getElections.controller);

export default router;