// Middleware to check if user has credits.
module.exports = (req, res, next) => {
    if(req.user.credits < 1){
        return res.status(403).send({error: 'You must have credits to do that...'});
    }
    next();
};
