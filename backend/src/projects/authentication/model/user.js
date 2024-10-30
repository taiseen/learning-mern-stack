import mongoose from "mongoose";
const Schema = mongoose.Schema;


const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            min: 2,
            max: 20,
        },

        email: {
            type: String,
            lowercase: true,
            required: true,
            unique: true,
            trim: true,
            max: 50,
        },

        password: {
            type: String,
            required: true,
            max: 20,
            min: 4,
        },

        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
        },

    },

    { timestamps: true }
);


const userModel = mongoose.model('users', userSchema);

export default userModel;