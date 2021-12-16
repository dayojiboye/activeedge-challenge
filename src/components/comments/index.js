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
  const [edit, setEdit] = useState(null);
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
      setComments([
        ...comments,
        {
          body: res.data.body,
          email: res.data.email,
          id: comments.length + 1,
          name: res.data.name,
        },
      ]);
      setTweet("");
    } catch (err) {
      console.log(err);
    } finally {
      setTweetLoading(false);
    }
  }

  async function editTweet(tweetId, name, email) {
    setTweetLoading(true);

    try {
      const res = await axios.put(
        `/comments/${tweetId}`,
        {
          body: tweet,
          name,
          email,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const singleTweet = comments.findIndex((x) => tweetId === x.id);

      const copy = [...comments];

      copy.splice(singleTweet, 1, { ...res.data });

      setComments([...copy]);

      setTweet("");
      setEdit(null);
    } catch (err) {
      console.log(err);
    } finally {
      setTweetLoading(false);
    }
  }

  async function deleteTweet(tweetId) {
    try {
      await axios.delete(`/comments/${tweetId}`);

      const filtered = comments.filter((x) => x.id !== tweetId);
      setComments([...filtered]);
    } catch (err) {
      console.log(err);
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
        {comments?.map((item, index) => (
          <div key={index} className="comment">
            <div className="comment-head">
              <div className="comment-name">{item.name}</div>
              <div className="comment-email">{item.email}</div>
            </div>

            <div className="comment-body">
              <p>{item.body}</p>
            </div>

            <div className="comment-actions">
              <button
                className="comment-edit"
                onClick={() => {
                  setEdit({
                    id: item.id,
                    name: item.name,
                    email: item.email,
                  });
                  setTweet(item.body);
                }}
              >
                <i className="fal fa-edit"></i>
              </button>
              <button
                className="comment-delete"
                onClick={() => deleteTweet(item.id)}
              >
                <i className="fal fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (edit) {
              editTweet(edit.id, edit.name, edit.email);
            } else {
              postTweet();
            }
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
