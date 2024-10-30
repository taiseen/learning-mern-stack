import httpStatus from 'http-status';


// 🔎 Read || Checking Operation
const logout = async (req, res) => {

    // const { refToken } = req.body;


    return res
        .status(httpStatus.OK) // 200 status code
        .json({ message: "You are logout successfully", success: true });

}


export default logout;