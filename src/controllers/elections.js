import { celebrate, Joi } from "celebrate";

export const registerElection = {
    validator: celebrate({
        body: Joi.object().keys({
            // date: 
        })
    }),

    controller: async (req, res) => {

    }
}