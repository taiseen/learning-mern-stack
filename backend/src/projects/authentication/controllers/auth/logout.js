// 🔎 Read || Checking Operation
const logout = async (_, res) => {

    // const { refToken } = req.body;

    return res
        .status(200) // 200 status code
        .clearCookie('token')
        .json({ message: "You are logout successfully" });

}


export default logout;