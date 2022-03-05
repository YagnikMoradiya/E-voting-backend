import express from "express";
import { editCandidate, getCandidateById, getCandidates, registerCandidate } from "../controllers/candidates.js";

const router = express.Router();

router.post('/register', registerCandidate.validator, registerCandidate.controller);

router.get('/get', getCandidates.validator, getCandidates.controller);

router.put('/edit', editCandidate.validator, editCandidate.controller);

router.get('/getById', getCandidateById.validator, getCandidateById.controller);

export default router;