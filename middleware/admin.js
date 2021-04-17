// role-based operation: admin controll.

function admin(req, res, next) 
{
    if(req.user.role === "user")
        return res.status(403).send('Access Denied...');

    next();
}

module.exports = admin;