import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const pf = "http://localhost:5000/images/";
  console.log("post--", pf + post.photo)
  return (
    // render post
    <div className="post">
      {post.photo && (
        <img
          className="postImg"
          src={pf + post.photo}
          alt=""
        />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((c) => (
            <span className="postCat">{c.name}</span>
          ))}
        </div>
        {/* Will go to single page */}
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">
            {post.title}
          </span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div >
  );
}
