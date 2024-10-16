import mongoose, { Schema, Document } from "mongoose";

export interface User extends Document {
    username: string;
    password: string;
    // email: string;
    // isAdmin: boolean;
}

const userSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
    },
    // email: {
    //     type: String,
    //     // required: [true, "Please provide a email"],
    //     unique: true,
    // },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    // isAdmin: {
    //     type: Boolean,
    //     default: false,
    // },
})


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)


export default UserModel