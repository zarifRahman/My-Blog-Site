import React, { useEffect, useState, useContext } from 'react';
import { Link, useLocation } from "react-router-dom";
import "./singlePost.css";
import axios from "axios";
import { Context } from '../../context/Context';

export default function SinglePost() {
  const location = useLocation();
  // take out the Id from path
  const path = location.pathname.split('/')[2];
  const [post, setPost] = useState({});
  const PF = "http://localhost:5000/images/";
  const { user } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);


  useEffect(() => {
    const getPost = async () => {
      // get data for specific id
      const res = await axios.get("/posts/" + path);
      //console.log("data for specific id---",res);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      // delete with post ID
      await axios.delete(`/posts/` + path,
        { data: { username: user.username } }
      );
      window.location.replace("/");
    } catch (err) {

    }
  }
  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false)
    } catch (err) {
      console.error(err)
    }
  };
  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        <h1>Single Post</h1>
        {post.photo && (
          <img
            className="singlePostImg"
            src={`localhost:5000/images/${post.photo}`}
            alt=""
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlePostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlePostTitle">
            {post.title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={() => setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
              </div>
            )}
          </h1>
        )}
        <div className="singlePostInfo">
          <span>
            Author:
            <b className="singlePostAuthor">
              <Link className="link" to={`/?user=${post.username}`}>
                {post.username}
              </Link>
            </b>
          </span>
          <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode ? (
          <textarea
            className="singlePostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlePostDesc">
            {post.desc}
          </p>
        )}
        {updateMode && (
          <button className="singlePostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
