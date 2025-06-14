const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-notes", async (req, res) => {
  try {
    const { subject, topics, studyType } = req.body;

    if (!subject || !topics || !studyType) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let prompt = `Create comprehensive study notes for ${subject} focusing on the following topics: ${topics}. `;

    switch (studyType) {
      case "revision":
        prompt += `Format as a quick revision guide with key concepts, important points, and common interview questions for each topic.`;
        break;
      case "detailed-explanation":
        prompt += `Provide detailed explanations with examples, code snippets, and real-world applications for each topic.`;
        break;
      case "in-depth-analysis":
        prompt += `Create an in-depth analysis including advanced concepts, complexity analysis, interview preparation tips, and best practices for each topic.`;
        break;
    }

    prompt += ` Format the response in markdown with clear headings and bullet points.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const notes = response.text();

    res.json({ notes });
  } catch (error) {
    console.error("Error generating notes:", error);
    res.status(500).json({ error: "Failed to generate notes" });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
