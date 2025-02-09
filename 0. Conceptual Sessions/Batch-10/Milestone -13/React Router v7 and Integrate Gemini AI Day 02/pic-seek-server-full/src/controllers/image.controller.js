import { ObjectId } from 'mongodb';
import generateImageUrl from '../utils/ai/generateImageUrl.js';
import getImageBuffer from '../utils/ai/getImageBuffer.js';
import { imageCollection } from '../utils/connectDB.js';

const insertAiImage = async (req, res) => {
  const { email, prompt, username, userImg, category } = req.body;

  if (!email || !prompt || !username || !userImg || !category) {
    return res.status(400).json({
      status: 400,
      message: 'Please provide email, prompt, username, userImg, category',
    });
  }

  try {
    // 1 + 2 - Create a final prompt & Generate image Buffer
    const buffer = await getImageBuffer(prompt, category); // 👈 Exceed Clipdrop credit limit

    // 3 - Upload image and get url
    const data = await generateImageUrl(buffer, prompt);

    // 4 - Insert data in mongodb
    const document = {
      email,
      username,
      userImg,
      prompt,
      category,
      thumb_img: data?.data?.thumb?.url,
      medium_img: data?.data?.medium?.url,
      original_img: data?.data?.url,
      createdAt: new Date().toISOString(),
    };

    const result = await imageCollection.insertOne(document);

    // 5 - Send response
    res.json({ ...result, url: document.original_img });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllImage = async (req, res) => {
  try {
    const result = await imageCollection
      .find()
      .project({ _id: 1, userImg: 1, username: 1, thumb_img: 1 })
      .toArray();
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSingleImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (id.length != 24) {
      return res.status(400).json({
        status: 400,
        message: 'please provide valid id',
      });
    }

    const result = await imageCollection.findOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const ImageController = {
  insertAiImage,
  getAllImage,
  getSingleImage,
};
