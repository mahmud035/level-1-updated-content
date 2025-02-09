import { useState } from 'react';

export default function GenerateImage() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const prompt = e.target.prompt.value;
    const form = new FormData();
    form.append('prompt', prompt);

    fetch('https://clipdrop-api.co/text-to-image/v1', {
      method: 'POST',
      headers: { 'x-api-key': import.meta.env.VITE_CLIPDROP_API_KEY },
      body: form,
    })
      .then((response) => response.arrayBuffer()) // Get the response as an ArrayBuffer
      .then((buffer) => {
        const blob = new Blob([buffer], { type: 'image/png' }); // Create a blob from the buffer
        const url = URL.createObjectURL(blob); // Create a URL for the image
        setImageUrl(url);
        setLoading(false);
        console.info(url);
      });
  };

  return (
    <div className="w-11/12 mx-auto">
      <h2 className="text-center text-2xl font-bold">Generate an Image</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full flex justify-center items-center pt-10"
      >
        <div className="join">
          <input
            type="text"
            name="prompt"
            placeholder="Enter a prompt for generating an image"
            className="input input-bordered join-item w-[300px]"
          />
          <button type="submit" className="btn btn-primary join-item">
            {loading ? 'Generating Image' : 'Generate Image'}
          </button>
        </div>
      </form>

      <div className="flex justify-center">
        {imageUrl && (
          <img src={imageUrl} alt="Generated Image" className="w-full mt-10" />
        )}
      </div>
    </div>
  );
}
