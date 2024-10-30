import config from '../../../config/index.js';
import httpStatus from 'http-status';
import jwt from "jsonwebtoken";
import userModel from '../model/user.js';
import getNewTokens from './getNewTokens.js';


// 🔎 Read || Checking Operation
const refreshToken = async (req, res) => {

    const { refreshToken } = req.body || {};

    if (!refreshToken) {
        return res.status(400).json({ message: "Please provide refreshToken" });
    }


    // check if refresh token valid
    const userInfo = jwt.verify(refreshToken, config.token.refSecret);

    if (userInfo.type !== "refresh") {
        return res.status(400).json({ message: "Invalid token type" });
    }


    // find user info from mongodb database...
    const existingUser = await userModel.findOne({ email: userInfo.email });

    // prepare the user object to generate token
    const userObj = {
        id: existingUser._id,
        name: existingUser.name,
        role: existingUser.role,
        email: existingUser.email,
    };


    const tokens = getNewTokens(userObj);

    return res
        .status(httpStatus.OK) // 200 status code
        .json({ ...tokens });
}


export default refreshToken;