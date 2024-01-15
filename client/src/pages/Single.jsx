import React, { useContext, useEffect, useState } from 'react';
import Edit from '../img/edit.png';
import Delete from '../img/delete.png';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../components/Menu';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import moment from 'moment';
import { enqueueSnackbar } from 'notistack';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const Single = () => {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [post, setPost] = useState({});
  const [loading, setOnLoading] = useState(null);
  const [errorState, setErrorState] = useState(null);
  const [deleted, setDeleted] = useState(null);

  const postId = location.pathname.split('/')[2];

  const handleDeletePost = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8800/api/posts/${postId}`,
        {
          withCredentials: true,
        }
      );
      enqueueSnackbar('Post deleted', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
      setDeleted(true);
    } catch (error) {
      enqueueSnackbar(`Delete fail, ${error.response.data}`, {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
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
        console.error(error);
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
          {Object.keys(post).length === 0 || deleted === true ? (
            <>
              {deleted && (
                <Stack sx={{ flex: 5, mt: 5 }}>
                  <Alert severity="success">Delete post successfully</Alert>
                </Stack>
              )}
              {Object.keys(post).length === 0 && (
                <Stack sx={{ flex: 5, mt: 5 }}>
                  <Alert severity="warning">Could not found this post!</Alert>
                </Stack>
              )}
            </>
          ) : (
            <div className="content">
              <img
                style={{ height: post.img === null && '0px' }}
                src={`../uploads/${post.img}`}
                alt="img"
              />
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
                    <Link to={`/write?edit=${postId}`}>
                      <img src={Edit} alt="edit" />
                    </Link>
                    <img onClick={handleDeletePost} src={Delete} alt="delete" />
                  </div>
                )}
              </div>
              <h1>{post.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: post.description }} />
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
