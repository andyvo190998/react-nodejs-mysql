import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const cat = useLocation().search;
  const [posts, setPosts] = useState([]);
  const [onLoading, setOnLoading] = useState(null);

  const goToPost = (post) => {
    navigate(`/post/${post.id}`);
  };

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
  return (
    <div className="home">
      {onLoading === null ? (
        <p style={{ textAlign: 'center' }}>Loading...</p>
      ) : (
        <div className="posts">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.id} className="post">
                <div
                  onClick={() => goToPost(post)}
                  className={post.img === null ? 'unknownImg' : 'img'}
                >
                  <img src={post.img} alt="Post image error" />
                </div>
                <div className="content">
                  <Link className="link" to={`/post/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p>{post.description}</p>
                  <button onClick={() => goToPost(post)}>Read More</button>
                </div>
              </div>
            ))
          ) : (
            <p>Create first post in this category</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
