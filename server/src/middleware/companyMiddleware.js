const companyMiddleware = (req, res, next) => {
    if(!req.user?.companyId){
        return res.status(403).json({
            success: false,
            message: "Company not found."
        });
    }
    req.companyId = req.user.companyId;
    next();
}
module.exports = companyMiddleware;