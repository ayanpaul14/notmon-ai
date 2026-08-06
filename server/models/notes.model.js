import mongoose from "mongoose";
import { nanoid } from "nanoid";

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserModel",
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    classLevel: String,
    examType: String,

    revisionMode: {
        type: Boolean,
        default: false
    },

    includeDiagram: Boolean,
    includeChart: Boolean,

    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },

    // ── Share Feature ──────────────────────────────────
    shareId: {
        type: String,
        default: () => nanoid(10),   // short unique ID e.g. "V1StGXR8_Z"
        unique: true,
        index: true
    },
    isPublic: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })

const Notes = mongoose.models.Notes || mongoose.model("Notes", noteSchema)

export default Notes