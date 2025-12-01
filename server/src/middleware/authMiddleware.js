import jwt from 'jsonwebtoken'

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization; //grab the token

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Accept both "Bearer <token>" and just "<token>"
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

    //Now lets verify this token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        //If not valid
        if(err) return res.status(401).json({message: "Invalid token"});

        //If valid

        //The decoded arg will allow access to some of the core feilds of the verified user
        //We intercept the request and change up the params, our token payload has the userID of said user
        req.userId = decoded.id;

        next(); //Good to head to the endpoint
    })

}

export default authMiddleware;
