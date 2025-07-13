import generateAiReply from '../utils/ai/generateAiReply.js';
import { commentCollection } from '../utils/connectDB.js';

const postUserComment = async (req, res, next) => {
  const { imageId, prompt, email, comment } = req.body;

  if (!imageId || !prompt || !email) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide imageId, prompt, email',
    });
  }

  const reply = await generateAiReply(prompt, comment); // AI Reply
  const document = {
    prompt,
    imageId,
    email,
    comment,
    reply,
    createdAt: new Date().toISOString(),
  };

  const result = await commentCollection.insertOne(document); // Save to DB
  res.json({ ...result, reply });
};

export const CommentController = { postUserComment };
