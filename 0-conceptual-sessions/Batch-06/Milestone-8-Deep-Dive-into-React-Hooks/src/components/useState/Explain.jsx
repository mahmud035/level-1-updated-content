import React, { useState } from 'react';

function Explain() {
  const [toggle, setToggle] = useState(true);

  console.count('Render');

  return (
    <div>
      {toggle && <h1>Explain</h1>}
      <button
        onClick={() => setToggle(!toggle)}
        className="px-3 py-2 bg-cyan-400 rounded-md"
      >
        {toggle ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

export default Explain;
