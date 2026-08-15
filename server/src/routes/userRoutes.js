const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { getMe, getUsers, createUser } = require("../controllers/userController");
const companyMiddleware = require("../middleware/companyMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/me", authMiddleware, companyMiddleware, getMe);
router.get("/", authMiddleware, companyMiddleware, roleMiddleware("admin","manager"), getUsers );
router.post("/", authMiddleware, companyMiddleware, roleMiddleware("admin"), createUser);
module.exports = router;