import { celebrate, Joi } from "celebrate";
import httpStatus from "http-status";
import { Voter } from "../models/index.js";
import APIResponse from "../utils/APIResponse.js";
import { GenderType } from "../utils/constant.js";
import { getJWTToken } from "../utils/jwt.helper.js";
import { comparePassword, hashPassword } from "../utils/utils.js";

export const signUp = {
    validator: celebrate({
        body: Joi.object().keys({
            fullName: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().min(8).required(),
            dob: Joi.string().required(),
            gender: Joi.string().valid(GenderType.male, GenderType.female, GenderType.other).required(),
        })
    }),

    controller: async (req, res) => {
        try {
            const newVoter = new Voter({
                email: req.body.email,
                password: await hashPassword(req.body.password, 10),
                fullName: req.body.fullName,
                gender: req.body.gender,
                dob: req.body.dob
            });

            const voter = await newVoter.save();

            if (voter) {
                const token = getJWTToken({
                    id: voter._id,
                });

                const voterData = {
                    id: voter._id,
                    fullName: voter.fullName,
                    email: voter.email,
                    gender: voter.gender,
                    dob: voter.dob,
                    token,
                };

                return res
                    .status(httpStatus.OK)
                    .json(new APIResponse(voterData, "Voter added to list", httpStatus.OK));
            }
            return res
                .status(httpStatus.BAD_REQUEST)
                .json(new APIResponse(null, "Voter not added to list.", httpStatus.BAD_REQUEST));
        } catch (error) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(new APIResponse(null, "Voter not added to list.", httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }
}

export const signIn = {
    validator: celebrate({
        body: Joi.object().keys({
            email: Joi.string().required(),
            password: Joi.string().min(8).required(),
        })
    }),

    controller: async (req, res) => {
        try {
            const voterExists = await Voter.findOne({
                email: req.body.email,
            });

            if (!voterExists) {
                return res
                    .status(httpStatus.BAD_REQUEST)
                    .json(new APIResponse(null, "Invalid credentials", httpStatus.BAD_REQUEST));
            }

            const passwordCheck = await comparePassword(req.body.password, voterExists.password);

            if (!passwordCheck) {
                return res.status(httpStatus.BAD_REQUEST).json(new APIResponse(null, "Invalid credentials", httpStatus.BAD_REQUEST));
            }

            const token = getJWTToken({
                id: voterExists._id
            });

            const voterData = {
                id: voterExists._id,
                fullName: voterExists.fullName,
                email: voterExists.email,
                gender: voterExists.gender,
                dob: voterExists.dob,
                token,
            };

            return res
                .status(httpStatus.OK)
                .json(new APIResponse(voterData, "Voter found in list", httpStatus.OK));

        } catch (error) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(new APIResponse(null, "Voter not found in list.", httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }
}

export const authenticateVoter = {
    controller: async (req, res) => {
        try {
            const voterExists = await Voter.findOne({
                _id: req.user.id,
            });

            if (!voterExists) {
                return res
                    .status(httpStatus.UNAUTHORIZED)
                    .json(new APIResponse(null, "Invalid credentials", httpStatus.UNAUTHORIZED));
            }

            const token = getJWTToken({
                id: voterExists._id
            });

            const voterData = {
                id: voterExists._id,
                fullName: voterExists.fullName,
                email: voterExists.email,
                gender: voterExists.gender,
                dob: voterExists.dob,
                token,
            };

            return res
                .status(httpStatus.OK)
                .json(new APIResponse(voterData, "Voter found in list", httpStatus.OK));

        } catch (error) {
            return res
                .status(httpStatus.INTERNAL_SERVER_ERROR)
                .json(new APIResponse(null, "Voter not found in list.", httpStatus.INTERNAL_SERVER_ERROR, error));
        }
    }
}

