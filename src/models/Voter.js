import mongoose from 'mongoose';
import { GenderType } from "../utils/constant.js";

const VoterSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: GenderType,
            default: GenderType.male,
        }
    },
    { timestamps: true }
);

VoterSchema.statics.findAddressAndDeleteById = function (Uid, Aid) {
    return this.findOneAndUpdate(
        { _id: Uid },
        { $pull: { address: [ Aid ] } }
    );
};

const VoterModel = mongoose.model("Voter", VoterSchema);

export default VoterModel;
