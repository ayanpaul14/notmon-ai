import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    credits: {
        type: Number,
        default: 200
    },
    isCreditAvailable: {
        type: Boolean,
        default: true
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Notes"
    }]
}, { timestamps: true })

const UserModel = mongoose.model("UserModel", userSchema)

export default UserModel