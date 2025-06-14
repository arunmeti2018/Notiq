const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event, context) {
    // Only allow POST
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: "Method Not Allowed"
        };
    }

    try {
        const { subject, topics, studyType } = JSON.parse(event.body);

        if (!subject || !topics || !studyType) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required fields" })
            };
        }

        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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

        return {
            statusCode: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            body: JSON.stringify({ notes })
        };
    } catch (error) {
        console.error("Error generating notes:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to generate notes" })
        };
    }
}; 