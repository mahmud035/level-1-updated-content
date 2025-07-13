import React from 'react';
import './SinglePlayer.css';

const SinglePlayer = ({ player, cart, setCart }) => {
  const { strDescriptionEN = 'Not Available', strThumb, strPlayer } = player;

  const handleAddToCart = () => {
    const info = {
      strDescriptionEN,
      strThumb,
      strPlayer,
      price: 115,
    };
    setCart(info);
  };
  console.log(cart);

  return (
    <div className="card">
      <img src={strThumb} alt="" />
      <div className="card-body">
        <h3>Name: {strPlayer}</h3>

        <p>
          {strDescriptionEN
            ? strDescriptionEN.slice(0, 60)
            : 'No description available'}
        </p>
        <div className="btn-container">
          <button className="btn-details">Details</button>
          <button onClick={handleAddToCart} className="btn-add-to-cart">
            Add to Cart
          </button>
          <button className="btn-bookmark">Bookmark</button>
        </div>
      </div>
    </div>
  );
};

export default SinglePlayer;
