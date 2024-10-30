import config from '../../../config/index.js';
import httpStatus from 'http-status';
import jwt from "jsonwebtoken";


const tokenValidation = (req, res, next) => {

    // this header data, come from frontend, when user login...
    const jwtToken = req.header("Authorization").split(' ')[1];


    // if no token present...
    if (!jwtToken) return res
        .status(httpStatus.FORBIDDEN) // 403 status code
        .json({ message: 'Unauthorized Access. JWT token is required.' });;


    try {
        const userInfo = jwt.verify(jwtToken, config.token.jwtSecret);

        // ✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅
        // store userInfo inside this user property...
        // by this track user inside whole app...
        req.user = userInfo;

        next(); // if all OK ==> then go to requested endpoint...

    } catch (err) {

        return res
            .status(httpStatus.FORBIDDEN) // 403 status code
            .json({
                error: err.message,
                message: 'Unauthorized, JWT token wrong or expired. ⏱️',
            });
    }
}

export default tokenValidation;