import React, { useEffect, useState } from 'react';

function EffectExplain() {
  const [toggle, setToggle] = useState(true);

  console.count('Render');

  useEffect(() => {
    console.count('Effect');

    return () => {
      console.log('Clean kortechi');
      // clean up action
      console.log('Done');
    };
  }, [toggle]);

  return (
    <div>
      {toggle && <h1>Effect Explain</h1>}
      <button
        className="px-3 py-2 bg-cyan-400 rounded-md"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

export default EffectExplain;
