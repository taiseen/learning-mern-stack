import config from "../../../config/index.js";
import jwt from "jsonwebtoken";


const getNewTokens = (existingUser) => {

    const accessToken = jwt.sign(
        { ...existingUser, type: "access" },
        config.token.jwtSecret,
        { expiresIn: config.token.jwtExpiresIn }
    );


    const refreshToken = jwt.sign(
        { ...existingUser, type: "refresh" },
        config.token.refSecret,
        { expiresIn: config.token.refExpiresIn });


    return { accessToken, refreshToken };
};


export default getNewTokens;