import React, { useState, useEffect } from "react";
import "./styles.scss";
import Loader from "react-loader-spinner";
import axios from "../../utils/axios";
import { Link, useLocation } from "react-router-dom";
import CustomTextarea from "../textarea";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [tweet, setTweet] = useState("");
  const [loading, setLoading] = useState(false);
  const [tweetLoading, setTweetLoading] = useState(false);
  const location = useLocation();

  async function fetchComments() {
    setLoading(true);

    try {
      const response = await axios.get("/comments");

      setComments(response.data.slice(0, 15));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function postTweet() {
    setTweetLoading(true);

    try {
      const res = await axios.post(
        "/comments",
        {
          body: tweet,
          name: location.state.name,
          email: location.state.email,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      setComments([...comments, res.data]);
      setTweet("");
    } catch (err) {
      console.log(err);
    } finally {
      setTweetLoading(false);
    }
  }

  useEffect(() => {
    fetchComments();
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
    <div className="comments-page">
      <div className="comments-page__header">
        <h1>Comments</h1>
        <Link to="/">Go back to home</Link>
      </div>

      <div className="comments-wrapper">
        {comments?.map((item) => (
          <div key={item.id} className="comment">
            <div className="comment-head">
              <div className="comment-name">{item.name}</div>
              <div className="comment-email">{item.email}</div>
            </div>

            <div className="comment-body">
              <p>{item.body}</p>
            </div>
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            postTweet();
          }}
          className="comment-input"
        >
          <CustomTextarea
            required
            id="tweet"
            name="tweet"
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
          />
          <button
            type="submit"
            className="comment-send-btn"
            disabled={tweetLoading}
          >
            {tweetLoading ? "Loading.." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentsPage;
