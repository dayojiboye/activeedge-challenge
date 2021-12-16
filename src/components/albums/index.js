/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "./styles.scss";
import { useLocation, Link } from "react-router-dom";
import Loader from "react-loader-spinner";
import axios from "../../utils/axios";

const Albums = () => {
  const location = useLocation();

  const [albums, setAlbums] = useState([]);

  const [loading, setLoading] = useState(false);

  async function fetchAlbums() {
    setLoading(true);

    try {
      const response = await axios.get(`/albums/${location.state.id}/photos`);
      const photos = response.data.slice(0, 10);

      axios
        .get("/albums")
        .then((res) => {
          const albums = res.data.slice(0, 10).map((item, index) => {
            return {
              id: item.id,
              title: item.title,
              imageUrl: photos[index].url,
            };
          });

          setAlbums(albums);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAlbums();
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
    <div className="albums-page">
      <header className="albums-header">
        <h1>{location.state && location.state.name}'s Albums</h1>
        <Link to="/">Go back to home</Link>
      </header>

      <div className="albums-list">
        {albums?.map((item) => (
          <div key={item.id} className="album-card">
            <div className="album-card__image">
              <img alt="" src={item.imageUrl} loading="lazy" />
            </div>

            <div className="album-card__body">
              <h3>{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Albums;
