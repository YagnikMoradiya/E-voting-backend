import mongoose from "mongoose";

const ElectionSchema = new mongoose.Schema(
    {
        electionName: {
            type: String,
            required: true
        },
        organizationName: {
            type: String,
            required: true
        },
        // electionDate: {
        //     type: Date,
        //     required: true
        // },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        },
        candidates: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Candidate'
            }
        ]

    },
    { timestamps: true }
);

const ElectionModel = mongoose.model("Election", ElectionSchema);

export default ElectionModel;
