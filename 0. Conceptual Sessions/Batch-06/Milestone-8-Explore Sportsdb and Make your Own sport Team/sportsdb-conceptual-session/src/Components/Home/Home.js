import React, { useEffect, useState } from 'react';
import Players from '../Players/Players';
import './Home.css';

const Home = () => {
  const [search, setSearch] = useState('');
  const [players, setPlayers] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(
      `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${search}`
    )
      .then((res) => res.json())
      .then((data) => setPlayers(data?.player));
  }, [search]);

  return (
    <div className="home-container">
      <div className="left-side">
        <h1>All Players</h1>
        <div className="search-area">
          <input
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="search-input"
          />
          &nbsp;
          <button className="search-btn">Search</button>
        </div>

        <Players players={players} cart={cart} setCart={setCart}></Players>
      </div>
      <div className="right-side">
        <h1>Cart</h1>
      </div>
    </div>
  );
};

export default Home;
