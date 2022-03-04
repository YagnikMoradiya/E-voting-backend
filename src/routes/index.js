import jwt from "express-jwt";
import { jwt_secret } from "../../config.js";
import voters from "./voters.js";
import candidates from "./candidates.js";

export const setup = (app) => {
    app.use(
        "/api/v1",
        jwt({
            secret: jwt_secret,
            algorithms: [ "HS256" ],
        }).unless({
            path: [
                "/api/v1/voter/signUp",
                "/api/v1/voter/signIn",
                "/api/v1/voter/send-otp",
                "/api/v1/voter/forgot-password",
                "/api/v1/candidate/register",
                "/api/v1/candidate/edit",

                // /^\/api\/v1\/shop\/search-shop\/*/,
            ],
        })
    );

    app.use("/api/v1/voter", voters);
    app.use("/api/v1/candidate", candidates);
};
