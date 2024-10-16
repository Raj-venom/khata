import mongoose, { Schema, Document } from "mongoose";

export interface Customer extends Document {
    _id: string;
    name: string;
    phone: string;
    address: string;
    total_amount: number;
    remaining_amount: number;
    remark: string;
}

const userSchema: Schema<Customer> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: true,
    },
    address: {
        type: String,
        required: [true, "Please provide an address"],
    },
    total_amount: {
        type: Number,
        required: [true, "Please provide total amount"],
    },
    remaining_amount: {
        type: Number,
        required: [true, "Please provide remaining amount"],
    },
    remark: {
        type: String,
        default: ""
    }
})

const CustomerModel = (mongoose.models.Customer as mongoose.Model<Customer>) || mongoose.model<Customer>("Customer", userSchema)

export default CustomerModel