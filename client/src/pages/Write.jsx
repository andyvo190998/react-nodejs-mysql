import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useSnackbar } from 'notistack';

const Write = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');
  const [file, setFile] = useState(null);
  const handleSubmitNewPost = async (postContent) => {
    try {
      const { data } = await axios.post(
        'http://localhost:8800/api/posts',
        postContent
      );
      navigate(`/post/${data.insertId}`);
      enqueueSnackbar('Post success!', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    } catch (error) {
      enqueueSnackbar('Post fail, please refresh and do it again!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
    }
  };

  const handleUpdatePost = async (updateContent) => {
    await axios
      .put(
        `http://localhost:8800/api/posts/${location.search.slice(6)}`,
        updateContent,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        navigate(`/post/${location.search.slice(6)}`);
      })
      .catch((error) => {
        enqueueSnackbar(`Update fail, ${error.response.data}`, {
          variant: 'error',
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          },
        });
      });
  };

  const handleSubmit = async () => {
    if (cat === '' || title === '' || value === '') {
      enqueueSnackbar('Please fill on all fields!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
      return;
    }
    if (currentUser === null) {
      enqueueSnackbar('Please login before posting!', {
        variant: 'error',
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'right',
        },
      });
      return;
    }
    const imgUrl = await uploadImage();

    const postContent = {
      title: title,
      // description: value.replace(/<\/?p>/g, ''),
      description: value,
      cat: cat,
      img: imgUrl,
      user_id: currentUser.id,
    };
    if (location.search === '') {
      handleSubmitNewPost(postContent);
    } else {
      handleUpdatePost(postContent);
    }
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post(
        'http://localhost:8800/api/upload',
        formData
      );
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getUpdatePost = async () => {
      await axios
        .get(`http://localhost:8800/api/posts/${location.search.slice(6)}`)
        .then((res) => {
          setValue(res.data.description);
          setTitle(res.data.title);
          setFile({ name: res.data.img });
          setCat(res.data.cat);
        })
        .catch((error) => console.error(error));
    };
    if (location.search !== '') {
      getUpdatePost();
    }
  }, []);

  return (
    <div className="add">
      <div className="content">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          value={title}
          placeholder="Title"
        />
        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <div style={{ display: 'flex' }}>
            <input
              onChange={(e) => setFile(e.target.files[0])}
              style={{ display: 'none' }}
              type="file"
              id="file"
            />
            <label className="file" htmlFor="file">
              Upload Image
            </label>
            <p style={{ color: 'blue' }}>{file !== null && file.name}</p>
          </div>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>
              {location.search === '' ? 'Post' : 'Update'}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              checked={cat === 'art'}
              name="cat"
              value="art"
              id="art"
            />
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              name="cat"
              value="science"
              checked={cat === 'science'}
              id="science"
            />
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              name="cat"
              value="technology"
              checked={cat === 'technology'}
              id="technology"
            />
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              name="cat"
              value="cinema"
              checked={cat === 'cinema'}
              id="cinema"
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              name="cat"
              checked={cat === 'design'}
              value="design"
              id="design"
            />
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              name="cat"
              value="food"
              checked={cat === 'food'}
              id="food"
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
