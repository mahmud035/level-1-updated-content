import React, { useEffect, useState } from 'react';

function EffectLessonOne() {
  const [post, setPost] = useState({});
  const [randomNumber, setRandomNumber] = useState(1);

  console.log(post);

  const handleRandomPost = () => {
    const rNumber = Math.ceil(Math.random() * 100);
    setRandomNumber(rNumber);
  };

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${randomNumber}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [randomNumber]);

  return (
    <div className="flex flex-col items-center">
      <div className="p-2 rounded-md shadow-2xl w-full max-w-5xl mx-5 bg-white">
        <div className=" bg-gradient-to-tr to-purple-100 from-cyan-100 rounded-sm p-8 ">
          <h1 className="text-2xl mb-5 font-bold text-gray-800">
            {post.title}
          </h1>
          <p className="text-gray-700">{post.body}</p>
        </div>
      </div>
      <div className="mt-10">
        <button
          onClick={handleRandomPost}
          className="px-3 py-2 bg-gradient-to-tr to-purple-100 from-cyan-100 rounded-md border-4 border-white"
        >
          New post
        </button>
      </div>
    </div>
  );
}

export default EffectLessonOne;
