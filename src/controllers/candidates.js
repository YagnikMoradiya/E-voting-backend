import { celebrate, Joi } from "celebrate";
import httpStatus from "http-status";
import { Candidate, Election } from "../models/index.js";
import APIResponse from "../utils/APIResponse.js";

export const registerCandidate = {
    validator: celebrate({
        body: Joi.object().keys({
            email: Joi.string().required(),
            phone: Joi.string().required(),
            fullName: Joi.string().required(),
            icon: Joi.string().required(),
            regNo: Joi.number().min(0).required(),
        })
    }),

    controller: async (req, res) => {
        try {
            const newCandidate = new Candidate({
                email: req.body.email,
                phone: req.body.phone,
                fullName: req.body.fullName,
                icon: req.body.icon,
                regNo: req.body.regNo
            });

            const candidate = await newCandidate.save();

            if (!candidate) {
                return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, 'Candidate not added', httpStatus.BAD_REQUEST));
            }

            const candidateData = {
                email: candidate.email,
                phone: candidate.phone,
                fullName: candidate.fullName,
                icon: candidate.icon,
                regNo: candidate.regNo
            }
            return res.status(httpStatus.OK).json(new APIResponse(candidateData, 'Candidate added successfully', httpStatus.OK));

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse(null, 'Candidate not added', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }
}

export const getCandidates = {
    validator: celebrate({
        query: Joi.object().keys({
            electionId: Joi.string().required(),
        })
    }),
    controller: async (req, res) => {
        try {
            const election = await Election.findById(req.query.electionId)
                .populate({
                    path: 'candidates'
                })
                .select('candidates')

            if (!election) {
                return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, 'Candidate not added', httpStatus.BAD_REQUEST));
            }

            return res.status(httpStatus.OK).json(new APIResponse(election.candidates, 'candidates got successfully', httpStatus.OK));

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse(null, 'Error in getting candidates', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }
}

export const editCandidate = {
    validator: celebrate({
        body: Joi.object().keys({
            email: Joi.string().required(),
            fullName: Joi.string(),
            icon: Joi.string(),
            regNo: Joi.number().min(0),
        })
    }),

    controller: async (req, res) => {
        try {
            const candidate = await Candidate.findOne(({
                email: req.body.email
            }))

            if (!candidate) {
                return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, 'Candidate not found', httpStatus.BAD_REQUEST));
            }

            const updatedCandidate = await Candidate.findOneAndUpdate(
                {
                    email: req.body.email,
                },
                {
                    fullName: req.body.fullName,
                    icon: req.body.icon,
                    regNo: req.body.regNo
                },
                { new: true }
            );

            if (!updatedCandidate) {
                return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, 'Candidate not updated', httpStatus.BAD_REQUEST));
            }

            const candidateData = {
                email: updatedCandidate.email,
                phone: updatedCandidate.phone,
                fullName: updatedCandidate.fullName,
                icon: updatedCandidate.icon,
                regNo: updatedCandidate.regNo
            }
            return res.status(httpStatus.OK).json(new APIResponse(candidateData, 'Candidate updated successfully', httpStatus.OK));

        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse(null, 'Candidate not updated', httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }
}