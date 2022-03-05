import { celebrate, Joi } from "celebrate";
import httpStatus from "http-status";
import moment from "moment";
import { Election } from "../models/index.js";
import APIResponse from "../utils/APIResponse.js";
import { ElectionFilterType } from "../utils/constant.js";

export const registerElection = {
    validator: celebrate({
        body: Joi.object().keys({
            electionName: Joi.string().required(),
            // electionDate: Joi.string().required(),
            organizationName: Joi.string().required(),
            startTime: Joi.string().required(),
            endTime: Joi.string().required(),
            candidates: Joi.array().items(Joi.string()).required()
        })
    }),

    controller: async (req, res) => {
        try {
            const newElection = new Election({
                electionName: req.body.electionName,
                // electionDate: req.body.electionDate,
                organizationName: req.body.organizationName,
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                candidates: req.body.candidates
            })

            const election = await newElection.save();

            if (!election) {
                return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, 'Election not added', httpStatus.BAD_REQUEST))
            }

            const electionData = {
                electionName: election.electionName,
                electionDate: election.electionDate,
                organizationName: election.organizationName,
                startTime: election.startTime,
                endTime: election.endTime,
                candidates: election.candidates
            }
            return res.status(httpStatus.OK).json(new APIResponse(electionData, 'Election added successfully', httpStatus.OK))
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse(null, 'Election not added', httpStatus.INTERNAL_SERVER_ERROR, error))
        }
    }
}

export const getElections = {
    validator: celebrate({
        query: Joi.object().keys({
            filter: Joi.string().valid(ElectionFilterType.past, ElectionFilterType.current, ElectionFilterType.upcoming).required(),
        })
    }),

    controller: async (req, res) => {
        try {
            let elections
            switch (req.query.filter) {
                case ElectionFilterType.past:
                    elections = await Election.find({
                        endTime: {
                            $lte: moment().format(),
                        }
                    });
                    break;
                case ElectionFilterType.current:
                    elections = await Election.find({
                        startTime: {
                            $lte: moment(),
                        },
                        endTime: {
                            $gte: moment(),
                        }
                    });
                    break;
                case ElectionFilterType.upcoming:
                    elections = await Election.find({
                        startTime: {
                            $gte: moment(),
                        }
                    });
                    break;
            }

            if (!elections) {
                return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, 'Elections not found', httpStatus.BAD_REQUEST))
            }

            return res.status(httpStatus.OK).json(new APIResponse(elections, 'Elections found successfully', httpStatus.OK))
        } catch (error) {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(new APIResponse(null, 'Election not found', httpStatus.INTERNAL_SERVER_ERROR))
        }
    }
}