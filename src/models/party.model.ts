import mongoose, { Schema, Document } from "mongoose";

export interface Party extends Document {
    _id: string;
    name: string;
    phone: string;
    alternate_phone: string;
    address: string;
    total_amount: number;
    remaining_amount: number;
    remark: string;
}
 
const partySchema: Schema<Party> = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
    },
    phone: {
        type: String,
        required: [true, "Please provide a phone number"],
        unique: true,
    },
    alternate_phone: {
        type: String,
        default: ""
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


const PartyModel = (mongoose.models.Party as mongoose.Model<Party>) || mongoose.model<Party>("Party", partySchema)

export default PartyModel