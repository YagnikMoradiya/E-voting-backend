import express from "express";
import { editCandidate, getCandidates, registerCandidate } from "../controllers/candidates.js";

const router = express.Router();

router.post('/register', registerCandidate.validator, registerCandidate.controller);

router.get('/get', getCandidates.validator, getCandidates.controller);

router.put('/edit', editCandidate.validator, editCandidate.controller);

export default router;