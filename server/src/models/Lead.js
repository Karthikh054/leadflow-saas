const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
    companyId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
        index: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    name:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
    },
    phone:{
        type: String,
        trim: true,
    },
    company:{
        type:String,
        trim: true,
    },
    source:{
        type: String,
        enum: 
        [
            "website",
            "facebook",
            "instagram",
            "google",
            "referral",
            "whatsapp",
            "other",
        ],
        default: "other",
    },
    status: {
        type: String,
        enum: [
            "new",
            "contacted",
            "qualified",
            "proposal",
            "won",
            "lost",
        ],
        default: "new",
        index: true,
    },

    expectedValue: {
        type: Number,
        default: 0,
        min: 0,
    },
    notes: {
        type: String,
        trim: true,
    },
},
{
    timestamps: true,
}
);

leadSchema.index({
    companyId: 1,
    createdAt: -1,
});

leadSchema.index({
    companyId: 1,
    status: 1,
});
module.exports = mongoose.model("Lead", leadSchema);