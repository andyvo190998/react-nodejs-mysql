import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const maximumRelevantPostDisplay = 3;

  const cat = useLocation().search;
  const [posts, setPosts] = useState([]);
  const [onLoading, setOnLoading] = useState(null);

  useEffect(() => {
    setOnLoading(null);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8800/api/posts${cat}`
        );
        setPosts(data);
        setOnLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [cat]);

  const handleNavigate = (id) => {
    navigate(`/post/${id}`);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div className="menu">
      <h1>Other posts you may like</h1>
      {onLoading === null ? (
        <p>Loading...</p>
      ) : (
        <>
          {posts.map((post, idx) => {
            if (idx <= 2) {
              return (
                <div
                  onClick={() => handleNavigate(post.id)}
                  className="post"
                  key={post.id}
                >
                  <img src={`../uploads/${post.img}`} alt="img" />
                  <h2>{post.title}</h2>
                  <button onClick={() => handleNavigate(post.id)}>
                    Read More
                  </button>
                </div>
              );
            }
          })}
        </>
      )}
    </div>
  );
};

export default Menu;
