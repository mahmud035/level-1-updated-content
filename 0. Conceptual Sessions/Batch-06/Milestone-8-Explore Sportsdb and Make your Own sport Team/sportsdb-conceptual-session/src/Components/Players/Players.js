import React from 'react';
import SinglePlayer from '../SinglePlayer/SinglePlayer';
import './Players.css';

const Players = ({ players, cart, setCart }) => {
  return (
    <div className="card-container">
      {players.map((player, index) => (
        <SinglePlayer
          key={index}
          player={player}
          cart={cart}
          setCart={setCart}
        ></SinglePlayer>
      ))}
    </div>
  );
};

export default Players;
