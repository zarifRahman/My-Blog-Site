import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import "./homepage.css";
import axios from "axios";

export default function Homepage() {
  // finds ?user=zarif
  const { search } = useLocation();
  // state decleration
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch post
    const fetchPosts = async () => {
      const res = await axios.get('/posts' + search);
      setPosts(res.data);
      console.log('====',res.data);
    }
    fetchPosts();
  }, [search])

  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
