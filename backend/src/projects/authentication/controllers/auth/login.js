import getNewTokens from '../../helper/getNewTokens.js';
import userModel from '../../model/user.js';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';


// 🔎 Read || Checking Operation
const login = async (req, res) => {

    try {

        // ⬇️ these data come from frontend by user given input field...
        const { email, password } = req.body;


        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
        // 🟧 Step 1:- User existence checking... 
        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧

        // find user info from mongodb database...
        const existingUser = await userModel.findOne({ email });

        // if user not exist...
        if (!existingUser) return res
            .status(httpStatus.FORBIDDEN) // 403 status code
            .json({ message: "User does not exist."});


        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
        // 🟧 Step 2:- password matching checking...
        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);

        // if password not match...
        if (!isPasswordMatch) return res
            .status(httpStatus.BAD_REQUEST) // 400 status code
            .json({ message: "Invalid credentials."});


        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
        // 🟩 Step 3:- if user & password ok, then process for jwt...
        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

        // prepare the user object to generate token
        const userObj = {
            id: existingUser._id,
            name: existingUser.name,
            role: existingUser.role,
            email: existingUser.email,
        };

        // token create with user object...
        const { accessToken, refreshToken } = getNewTokens(userObj);

        // send user info + jwtToken at frontend...
        res
            .status(httpStatus.OK) // 200 status code
            .json({ ...userObj, accessToken, refreshToken })

    } catch (err) {

        res
            .status(httpStatus.INTERNAL_SERVER_ERROR) // 500 status code
            .json({
                error: err.message,
                message: "Internal server error",
            })
    }
}


export default login;