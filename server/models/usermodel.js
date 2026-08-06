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
    }],
    // ── Streak & Gamification ──────────────────────────
    streak: {
        type: Number,
        default: 0
    },
    lastActiveDate: {
        type: String,   // stored as "YYYY-MM-DD" for easy date comparison
        default: null
    },
    xp: {
        type: Number,
        default: 0
    },
    totalNotes: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const UserModel = mongoose.model("UserModel", userSchema)

export default UserModel