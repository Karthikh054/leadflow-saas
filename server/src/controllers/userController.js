const bcrypt = require("bcryptjs");

const User = require("../models/User");

const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId)
            .select("-password")
            .populate(
                "companyId",
                "name email plan status"
            );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Get me error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch user",
        });
    }
};

const createUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters",
            });
        }

        const existingUser = await User.findOne({
            companyId: req.companyId,
            email: email.toLowerCase(),
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists in this company",
            });
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const user = await User.create({
            companyId: req.companyId,
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            role: role || "sales",
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                companyId: user.companyId,
            },
        });
    } catch (error) {
        console.error("Create user error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create user",
        });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({
            companyId: req.companyId,
        })
            .select("-password")
            .sort({
                createdAt: -1,
            });

        return res.json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.error("Get users error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};

module.exports = {
    getMe,
    createUser,
    getUsers,
};