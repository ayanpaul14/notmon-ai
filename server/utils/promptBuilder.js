export const buildPrompt = (topic, classLevel, examType, revisionMode, includeDiagram, includeChart) => {
  return `You are a STRICT JSON generator for an exam preparation system.

VERY IMPORTANT RULES:
1. Output MUST be valid JSON only.
2. The response will be parsed using JSON.parse().
3. Do NOT include explanations outside JSON.
4. Use ONLY double quotes " for strings.
5. Do NOT use comments.
6. Do NOT include trailing commas.
7. Escape line breaks using \\n.
8. Do NOT include emojis inside JSON text values.

TASK:
Convert the provided topic into clear, exam-focused study notes.

INPUT:
Topic: ${topic}
Class Level: ${classLevel || "Not specified"}
Exam Type: ${examType || "General"}
Revision Mode: ${revisionMode ? "ON" : "OFF"}
Include Diagram: ${includeDiagram ? "YES" : "NO"}
Include Charts: ${includeChart ? "YES" : "NO"}

GLOBAL CONTENT RULES:
- Use clear, simple, exam-oriented language
- Notes MUST be Markdown formatted
- Notes must contain thorough, structured answers, detailed definitions, and complete explanations under each heading. Never output empty headings or lists of topics without content.

REVISION MODE RULES (CRITICAL):

IF REVISION MODE is ON:
- Notes must be concise but complete
- Only bullet points
- Bullet points must summarize the key definitions, formulas, and facts
- No long paragraphs

IF REVISION MODE is OFF:
- Notes must be highly detailed, comprehensive, and provide full, exhaustive answers.
- Each sub-topic should include:
  - Clear, precise definitions.
  - In-depth explanations answering "how" and "why" with rich technical/academic context.
  - Concrete examples, diagrams descriptions, and use-cases.
- Write full paragraphs and complete descriptive answers under all headings. No storytelling.

IMPORTANCE RULES:
- Divide sub-topics into THREE categories:
    - ⭐ Very Important Topics
    - ⭐⭐ Important Topics
    - ⭐⭐⭐ Frequently Asked Topics
- All three categories MUST be present
- Base importance on exam frequency and weightage

DIAGRAM RULES:
- If INCLUDE DIAGRAM is YES:
    - diagram.data MUST be a SINGLE STRING
    - Valid Mermaid syntax only
    - Must start with: graph TD
    - Wrap EVERY node label in square brackets [ ]
    - Do NOT use special characters inside labels
- If INCLUDE DIAGRAM is NO:
    - diagram.data MUST be ""

CHART RULES (RECHARTS):
- If INCLUDE CHARTS is YES:
    - charts array MUST NOT be empty
    - Generate at least ONE chart
    - Choose chart based on topic type:
        - THEORY topic -> bar or pie (importance / weightage)
        - PROCESS topic -> bar or line (steps / stages)
    - Use numeric values ONLY
    - Labels must be short and exam-oriented
- If INCLUDE CHARTS is NO:
    - charts MUST be []

YOUTUBE VIDEO RECOMMENDATION RULES (CRITICAL):
- suggestedVideos MUST be an array containing exactly 2 items.
- Item 1: Recommended One-Shot video search query in Hindi.
  - format: { "title": "[Topic] One Shot in Hindi", "url": "https://www.youtube.com/results?search_query=[escaped-topic-text]+one+shot+hindi", "language": "Hindi" }
- Item 2: Recommended One-Shot video search query in English.
  - format: { "title": "[Topic] One Shot in English", "url": "https://www.youtube.com/results?search_query=[escaped-topic-text]+one+shot+english", "language": "English" }

CHART TYPES ALLOWED:
- bar
- line
- pie

CHART OBJECT FORMAT:
{
  "type": "bar | line | pie",
  "title": "string",
  "data": [
    { "name": "string", "value": 10 }
  ]
}

STRICT JSON FORMAT (DO NOT CHANGE):

{
  "subTopics": {
    "⭐": [],
    "⭐⭐": [],
    "⭐⭐⭐": []
  },
  "importance": "⭐ | ⭐⭐ | ⭐⭐⭐",
  "notes": "string",
  "revisionPoints": [],
  "questions": {
    "short": [],
    "long": [],
    "diagram": ""
  },
  "diagram": {
    "type": "flowchart | graph | process",
    "data": ""
  },
  "charts": [],
  "suggestedVideos": [
    {
      "title": "string",
      "url": "string",
      "language": "Hindi | English"
    }
  ]
}

RETURN ONLY VALID JSON.`;
};