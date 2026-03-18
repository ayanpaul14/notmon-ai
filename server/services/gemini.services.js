const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

export const generateGeminiResponse = async (prompt) => {
    try {
        const response = await fetch(GROQ_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [{ role: "user", content: prompt }],
                max_tokens: 1024
            })
        });

        if (!response.ok) {
            const err = await response.text();
            throw new Error(err);
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;

        if (!text) throw new Error("No text returned from Groq");

        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            return JSON.parse(cleanText);
        } catch {
            return cleanText;
        }

    } catch (error) {
        console.error("GROQ ERROR:", error.message);
        throw new Error(`Groq API failed: ${error.message}`);
    }
};