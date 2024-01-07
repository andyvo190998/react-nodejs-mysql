import React, { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import moment from 'moment';

const Single = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [post, setPost] = useState({});
  const [loading, setOnLoading] = useState(null);
  const [errorState, setErrorState] = useState(null);

  const postId = location.pathname.split('/')[2];

  const handleDeletePost = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8800/api/posts/${postId}`
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setOnLoading(null);
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8800/api/posts/${postId}`
        );
        setPost(data);
      } catch (error) {
        setErrorState(error.response.data);
      }
      setOnLoading(false);
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
            <div className="content">Can not found this post</div>
          ) : (
            <div className="content">
              <img src={post.img} alt="img" />
              <div className="user">
                <img
                  src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="img"
                />
                <div className="info">
                  <span>{post.username}</span>
                  <p>Posted {moment(post.date).fromNow()}</p>
                </div>
                {currentUser !== null && currentUser.id === post.user_id && (
                  <div className="edit">
                    <Link to={`/write?edit=2`}>
                      <img src={Edit} alt="edit" />
                    </Link>
                    <img onClick={handleDeletePost} src={Delete} alt="delete" />
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
