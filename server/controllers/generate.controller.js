import NotesModel from "../models/notes.model.js"
import UserModel from "../models/usermodel.js"
import { buildPrompt } from "../utils/promptBuilder.js"         // this one is correct
import { generateGeminiResponse } from "../services/gemini.services.js"
import Notes from "../models/notes.model.js"
import { nanoid } from "nanoid";

export const generateNotes = async (req, res) =>{
    try {
        const{
            topic, 
                classLevel, 
                examType, 
                revisionMode = false, 
                includeDiagram = false, 
                includeChart = false
        } = req.body;
if(!topic){
    return res.status(400).json({message: "Topic is required"})
}
const user = await UserModel.findById(req.userId)
if(!user){
    return res.status(400).json({message:"user is not found"})
}

if(user.credits < 10){
    user.isCreditAvailable = false
    await user.save()
    return res.status(403).json({
        message: "Insufficient credits"
    });
}

const prompt = buildPrompt(
                topic, 
                classLevel, 
                examType, 
                revisionMode, 
                includeDiagram, 
                includeChart
)
        const aiResponse = await generateGeminiResponse(prompt)
        const notes = await NotesModel.create({
            user: user._id,
            topic,
            classLevel,
            examType,
            revisionMode,
            includeDiagram,
            includeChart,
            content: aiResponse
        })

        // ── Streak & XP logic ────────────────────────────
        const today = new Date().toISOString().split('T')[0];
        const yesterdayDate = new Date();
        yesterdayDate.setDate(yesterdayDate.getDate() - 1);
        const yesterday = yesterdayDate.toISOString().split('T')[0];

        let xpGained = 10;
        let streakUpdated = user.streak || 0;

        if (!user.lastActiveDate) {
            streakUpdated = 1;
            xpGained = 10;
        } else if (user.lastActiveDate === yesterday) {
            streakUpdated += 1;
            xpGained = 10 + (streakUpdated * 2); // bonus XP for streak
        } else if (user.lastActiveDate !== today) {
            // Not active yesterday, and not active today (i.e. break in streak)
            streakUpdated = 1;
            xpGained = 10;
        }

        user.streak = streakUpdated;
        user.lastActiveDate = today;
        user.xp = (user.xp || 0) + xpGained;
        user.totalNotes = (user.totalNotes || 0) + 1;

        user.credits -= 10;
        if (user.credits <= 0) user.isCreditAvailable = false;

        if(!Array.isArray(user.notes)){
            user.notes = []
        }

        user.notes.push(notes._id)
        await user.save();

        return res.status(200).json({
            data: aiResponse,
            noteId: notes._id,
            creditsLeft: user.credits,
            user: {
                credits: user.credits,
                streak: user.streak,
                xp: user.xp,
                totalNotes: user.totalNotes
            }
        })

    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "AI generation failed",
            message: error.message
        });
        
    }
}

export const getUserNotes = async (req, res) => {
    try {
        const userId = req.userId;
        const notes = await Notes.find({ user: userId }).sort({ createdAt: -1 });

        // Auto-migrate old notes missing shareId
        for (let note of notes) {
            if (!note.shareId) {
                note.shareId = nanoid(10);
                await note.save();
            }
        }
        
        return res.status(200).json({ notes });
    } catch (error) {
        return res.status(500).json({ message: `getUserNotes error: ${error}` });
    }
};

// ── Share note controllers ───────────────────────────
export const toggleShareNotes = async (req, res) => {
    try {
        const { id } = req.params;
        const { isPublic } = req.body;
        const note = await Notes.findOne({ _id: id, user: req.userId });
        
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }
        
        note.isPublic = isPublic;
        if (!note.shareId) {
            note.shareId = nanoid(10);
        }
        await note.save();
        
        return res.status(200).json({ message: `Note is now ${isPublic ? 'public' : 'private'}`, note });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getSharedNotes = async (req, res) => {
    try {
        const { shareId } = req.params;
        const note = await Notes.findOne({ shareId, isPublic: true });
        
        if (!note) {
            return res.status(404).json({ message: "Shared note not found or is private" });
        }
        
        return res.status(200).json({ note });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};