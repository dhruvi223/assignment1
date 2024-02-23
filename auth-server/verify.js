const isAdmin = (req,res, next) => {
    if (req.body.role !== 'admin'){
        return res.status(403).send('Access denied, only admins are allowed.')
    }
    next();
};
module.exports = isAdmin;