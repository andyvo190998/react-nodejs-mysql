import React, { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Single = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [post, setPost] = useState({});
  const [loading, setOnLoading] = useState(null);

  const postId = location.pathname.split('/')[2];

  useEffect(() => {
    setOnLoading(null);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8800/api/posts/${postId}`
        );
        setPost(data);
        setOnLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [location]);
  return (
    <div className="single">
      {loading === null ? (
        <div className="content">Loading...</div>
      ) : (
        <>
          {Object.keys(post).length === 0 ? (
            <p>Can not found this post</p>
          ) : (
            <div className="content">
              <img src={post.img} alt="img" />
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="img"
                />
                <div className="info">
                  <span>John</span>
                  <p>Posted 2 days ago</p>
                </div>
                {currentUser !== null && (
                  <div className="edit">
                    <Link to={`/write?edit=2`}>
                      <img src={Edit} alt="edit" />
                    </Link>
                    <img src={Delete} alt="delete" />
                  </div>
                )}
              </div>
              <h1>{post.title}</h1>
              <p>{post.description}</p>
            </div>
          )}
        </>
      )}

      <div className="menu">
        <Menu />
      </div>
    </div>
  );
};

export default Single;
