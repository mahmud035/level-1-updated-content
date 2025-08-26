import { GoogleGenerativeAI } from '@google/generative-ai';
import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-2.0-flash',
  // model: 'gemini-1.5-flash',
  tools: [{ codeExecution: {} }],
});

// Generate text from text-only input
app.get('/test-ai', async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) return res.json({ message: 'Please provide a prompt in query' });

  const result = await model.generateContent(prompt);
  res.json({ answer: result.response.text() });
});

// Create a chat conversation
app.get('/rumour-detector', async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) return res.json({ message: 'Please provide a prompt in query' });

  const chat = model.startChat({
    history: [
      {
        role: 'user',
        parts: [
          {
            text: 'When i give you any text. you have to tell me the rumour parentage of the text',
          },
        ],
      },
      {
        role: 'model',
        parts: [{ text: 'Okay. Tell me' }],
      },
      {
        role: 'user',
        parts: [
          {
            text: 'Bangladesh is secretly building a floating city in the Bay of Bengal powered entirely by solar energy and AI-driven technology!',
          },
        ],
      },
      {
        role: 'model',
        parts: [{ text: 'Rumour percentage 99%' }],
      },
      {
        role: 'user',
        parts: [
          {
            text: 'Human can fly',
          },
        ],
      },
      {
        role: 'model',
        parts: [{ text: 'Rumour percentage 100%' }],
      },
      {
        role: 'user',
        parts: [
          {
            text: 'Human eat rock',
          },
        ],
      },
      {
        role: 'model',
        parts: [{ text: 'Rumour percentage 100%' }],
      },
    ],
  });

  const result = await chat.sendMessage(prompt);
  const answer = result.response.text();
  res.json({ rumourStatus: answer });
});

// Generate JSON data from text input
app.get('/generate-json', async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) return res.json({ message: 'Please provide a prompt in query' });

  const finalPrompt = `Generate some data from this prompt ${prompt} using this JSON schema:
                       data = {'data' : output}
                       Return: Array<data>`;

  const result = await model.generateContent(finalPrompt);
  const output = result.response.text().slice(7, -4); // Get the JSON data from the response
  const jsonData = JSON.parse(output);
  res.json(jsonData);
});

async function imageUrlToGenerativePart(url, mimeType) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });
  return {
    inlineData: {
      data: Buffer.from(response.data).toString('base64'), // Convert image to Base64
      mimeType,
    },
  };
}

// Generate text from text-and-image input
app.get('/generate-description', async (req, res) => {
  const imageUrl = req.query?.prompt; // Get the image URL from query params
  if (!imageUrl) return res.json({ message: 'Missing image URL' });

  const mimeType = 'image/png'; // Adjust based on the image type (e.g., "image/jpeg")
  const imagePart = await imageUrlToGenerativePart(imageUrl, mimeType);
  const prompt = 'Describe the details of the image';

  const result = await model.generateContent([prompt, imagePart]);

  res.json({ description: result.response.text() });
});

// Generate code from text input
app.get('/generate-code', async (req, res) => {
  const prompt = req.query?.prompt;
  if (!prompt) return res.json({ message: 'Please provide a prompt in query' });

  const finalPrompt = `Generate code from this prompt: ${prompt}`;

  const result = await model.generateContent(finalPrompt);
  const output = result.response.text(); // Ensure output is plain text
  res.json({ code: output });
});

app.get('/', (req, res) => {
  res.json({ message: "Let's Crack the power of AI" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
