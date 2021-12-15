import React, { useState, useEffect } from "react";
import "./styles.scss";
import axios from "../../utils/axios";
import Loader from "react-loader-spinner";

const Home = () => {
  const [artistes, setArtistes] = useState([]);

  const [loading, setLoading] = useState(false);

  async function fetchArtistes() {
    setLoading(true);

    try {
      const response = await axios.get("/users");
      setArtistes(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchArtistes();
  }, []);

  if (loading)
    return (
      <div className="loader">
        <Loader
          visible={loading}
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      </div>
    );

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to Chocolate city</h1>
        <p>Get to know our talented artistes</p>
      </header>

      <div className="home-artists">
        {artistes?.map((item) => (
          <div key={item.id} className="home-artiste-card">
            <div className="home-artiste-card__header">
              <h3>{item.name}</h3>
            </div>
            <div className="home-artiste-card__body">
              <div className="artiste-handle">
                <span>@{item.username}</span>
              </div>
              <div className="artiste-website">
                <a href="/">{item.website}</a>
              </div>
            </div>
            <div className="home-artiste-card__footer">
              <div className="home-card-links">
                <a href="/">View Albums</a>
                <a href="/">View Comments</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
