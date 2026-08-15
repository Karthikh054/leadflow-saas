const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        phone: {
            type: String,
            trim: true,
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active",
        },

        plan: {
            type: String,
            enum: ["free", "starter", "business"],
            default: "free",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Company", companySchema);