import dotenv from 'dotenv';

dotenv.config();

const getImageBuffer = async (prompt, category) => {
  const finalPrompt = `imagine a ${category} : ${prompt}`;
  const myForm = new FormData();
  myForm.append('prompt', finalPrompt);

  const response = await fetch('https://clipdrop-api.co/text-to-image/v1', {
    method: 'POST',
    headers: { 'x-api-key': process.env.CLIPDROP_API_KEY }, // 👈 Exceed Clipdrop credit limit
    body: myForm,
  });

  const buffer = await response.arrayBuffer();

  return buffer;
};

export default getImageBuffer;
