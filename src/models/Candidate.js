import mongoose from "mongoose";

const CandidateSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        regNo: {
            type: Number,
            required: true,
        },
        icon: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const CandidateModel = mongoose.model("Candidate", CandidateSchema);

export default CandidateModel;
