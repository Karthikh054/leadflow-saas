const Lead = require("../models/Lead");
const User = require("../models/User");

const createLead = async (req, res) => {
    try{
        const {name,
            email,
            phone,
            company,
            source,
            status,
            assignedTo,
            expectedValue,
            notes,} = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Lead name is required",
            });
        }

        if(assignedTo){
            const assignedUser = await User.findOne({_id: assignedTo, companyId: req.companyId,});
            if(!assignedUser){
                return res.status(400).json({
                    success: false,
                    message: "Assigned user not found in your company",
                });
            }
        }

        const lead = await Lead.create({
            companyId: req.companyId,
            createdBy: req.user.userId,
            assignedTo: assignedTo || null,
            name,
            email,
            phone,
            company,
            source,
            status,
            expectedValue,
            notes,
        });

        const populatedLead = await Lead.findById(lead._id)
            .populate("createdBy", "name email")
            .populate("assignedTo", "name email");

        return res.status(201).json({
            success: true,
            message: "Lead created successfully",
            lead: populatedLead,
        });

    }catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}

const getLeads = async (req,res) => {
    try{
        const {search, status, source, assignedTo, page = 1, limit = 10} = req.query;

        const currentPage = Math.max(Number(page), 1);
        const perPage = Math.min(Math.max(Number(limit), 1), 100);

        const filter = {companyId: req.companyId};

        if(status){
            filter.status = status;
        }

        if(source){
            filter.source = source;
        }

        if(assignedTo){
            filter.assignedTo = assignedTo;
        }

        if (search) {
            filter.$or = [
                {
                    name: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    email: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    phone: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    company: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }
        const skip = (currentPage - 1) * perPage;

        const [leads, total] = await Promise.all([
            Lead.find(filter)
                .populate("createdBy", "name email")
                .populate("assignedTo", "name email")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(perPage),
            Lead.countDocuments(filter),
        ]);

        const totalPages = Math.ceil(
            total / perPage
        );

        return res.json({
            success: true,
            leads,
            pagination: {
                total,
                page: currentPage,
                limit: perPage,
                totalPages,
                hasNextPage:
                    currentPage < totalPages,
                hasPreviousPage:
                    currentPage > 1,
            },
        });

    }catch(error){
        console.error("Get leads error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch leads",
        });
    }
}

const getLead = async (req, res) => {
    try{
        const {id} = req.params;

        const lead = await Lead.findOne({
            _id: id,
            companyId: req.companyId,
        }).populate("createdBy", "name email")
        .populate("assignedTo", "name email");

        if(!lead){
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        return res.json({
            success: true,
            lead,
        });
    }catch(error){
        console.error("Get lead error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch lead",
        });
    }
}

const updateLead = async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = [
            "name",
            "email",
            "phone",
            "company",
            "source",
            "status",
            "assignedTo",
            "expectedValue",
            "notes",
        ];

        const updateData = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updateData[field] =
                    req.body[field];
            }
        }

        if (updateData.assignedTo) {
            const assignedUser =
                await User.findOne({
                    _id: updateData.assignedTo,
                    companyId: req.companyId,
                });

            if (!assignedUser) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Assigned user does not belong to this company",
                });
            }
        }

        const lead = await Lead.findOneAndUpdate(
            {
                _id: id,
                companyId: req.companyId,
            },
            updateData,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate(
                "createdBy",
                "name email"
            )
            .populate(
                "assignedTo",
                "name email"
            );

            if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        return res.json({
            success: true,
            message: "Lead updated successfully",
            lead,
        });
    } catch (error) {
        console.error("Update lead error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update lead",
        });
    }
};

const deleteLead = async (req, res) => {
    try {
        const { id } = req.params;

        const lead = await Lead.findOneAndDelete({
            _id: id,
            companyId: req.companyId,
        });

        if (!lead) {
            return res.status(404).json({
                success: false,
                message: "Lead not found",
            });
        }

        return res.json({
            success: true,
            message: "Lead deleted successfully",
        });
    } catch (error) {
        console.error("Delete lead error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to delete lead",
        });
    }
};

module.exports ={
    createLead,
    getLeads,
    getLead,
    updateLead,
    deleteLead,
};