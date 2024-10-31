import userModel from '../../model/user.js';
import bcrypt from 'bcrypt';


// ✅ Write || Create Operation
const registration = async (req, res) => {

    try {

        // ⬇️ these data come from frontend by user given input field...
        const { name, email, password } = req.body;


        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧
        // 🟧 Step 1:- User existence checking... 
        // 🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧🟧

        const user = await userModel.findOne({ email });

        if (user) return res
            .status(409) // CONFLICT status code
            .json({ message: "Email already exist, you can login." });



        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
        // 🟩 Step 2:- if user not exist, then start registration process...
        // 🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

        // 📝 for password protection | Hashing System... | avoid Hashing collection also...
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt); // hash user given password...

        // ✅ creating new user | object data model...
        const newUserRegister = new userModel({ name, email, password: passwordHash });

        // ✅ save user at mongodb database...
        await newUserRegister.save();


        res
            .status(201)
            .json({ message: "Registration successfully." });

        // .json(savedUser);
        // send user info at frontend...

    } catch (err) {

        res
            .status(500)
            .json({
                error: err.message,
                message: "Internal server error.",
            });
    }
}


export default registration;