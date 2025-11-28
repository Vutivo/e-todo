module.exports = (req, res, next) => {
    res.status(404).json({
        status: "error",
        msg: "Route not found"
    });
};
