import { config } from "dotenv";
import express from "express";
import OpenAI from "openai";
import cors from "cors";

// Load environment variables
config();

const app = express();
const port = 5001;

app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Initialize OpenAI API client
const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

// Define POST endpoint for chat
app.post("/api/chat", async (req, res) => {
  const { input } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{"role": "user", "content": input}],
    });
    console.log(response.choices[0].message);
    res.json(response.choices[0].message);
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
