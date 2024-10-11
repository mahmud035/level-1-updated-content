import React, { useEffect, useState } from 'react';

function EffectLessonTwo() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  console.log(time);

  return (
    <div>
      <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-purple-400 to-cyan-400">
        {time}
      </h1>
    </div>
  );
}

export default EffectLessonTwo;
