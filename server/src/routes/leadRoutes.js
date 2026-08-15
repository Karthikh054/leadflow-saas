const express = require('express');

const authMiddleware = require("../middleware/authMiddleware");
const companyMiddleware = require("../middleware/companyMiddleware");
const { createLead, getLeads, getLead, updateLead, deleteLead } = require('../controllers/leadController');

const router = express.Router();

router.use(authMiddleware, companyMiddleware);

router.post("/", createLead);

router.get("/", getLeads);

router.get("/:id", getLead);

router.put("/:id", updateLead);

router.delete("/:id", deleteLead);

module.exports = router;