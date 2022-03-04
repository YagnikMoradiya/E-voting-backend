import httpStatus from "http-status";
import { Voter } from "../models/index";
import APIResponse from "./APIResponse";

const userAlreadyExists = async (req, res, next) => {
  try {
    const check = await Voter.findOne({
      email: req.body.email,
      is_deleted: false,
    }).exec();

    if (check) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json(
          new APIResponse(
            null,
            "User Already exists with this email",
            httpStatus.BAD_REQUEST
          )
        );
    }
    next();
  } catch (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(
        new APIResponse(
          null,
          "User Already exists with this email",
          httpStatus.BAD_REQUEST,
          error
        )
      );
  }
};

const userExists = async (req, res, next) => {
  try {
    const check = await Voter.findOne({
      email: req.body.email,
      is_deleted: false,
    }).exec();

    if (check) {
      next();
    }
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(
        new APIResponse(
          null,
          "User not exists with this email",
          httpStatus.BAD_REQUEST
        )
      );
  } catch (error) {
    return res
      .status(httpStatus.BAD_REQUEST)
      .json(
        new APIResponse(
          null,
          "User not exists with this email",
          httpStatus.BAD_REQUEST,
          error
        )
      );
  }
};

export { userAlreadyExists, userExists };
