import axios from 'axios';
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { useSnackbar } from 'notistack';

const Write = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [cat, setCat] = useState('');

  const handleSubmit = async () => {
    try {
      const postContent = {
        title: title,
        description: value.replace(/<\/?p>/g, ''),
        cat: cat,
        img: null,
        user_id: currentUser.id,
      };
      await axios.post('http://localhost:8800/api/posts', postContent);
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

  return (
    <div className="add">
      <div className="content">
        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
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
          <input style={{ display: 'none' }} type="file" id="file" />
          <label className="file" htmlFor="file">
            Upload Image
          </label>
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
              id="cinema"
            />
            <label htmlFor="cinema">Cinema</label>
          </div>
          <div className="cat">
            <input
              onChange={(e) => setCat(e.target.value)}
              type="radio"
              name="cat"
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
