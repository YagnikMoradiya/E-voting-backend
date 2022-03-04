import express from "express";
import { editCandidate, registerCandidate } from "../controllers/candidates.js";

const router = express.Router();

router.post('/register', registerCandidate.validator, registerCandidate.controller);

router.put('/edit', editCandidate.validator, editCandidate.controller);

export default router;