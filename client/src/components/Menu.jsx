import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const maximumRelevantPostDisplay = 3;
  // const posts = [
  //   {
  //     id: 1,
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
  //     img: 'https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     id: 2,
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
  //     img: 'https://images.pexels.com/photos/6489663/pexels-photo-6489663.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     id: 3,
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
  //     img: 'https://images.pexels.com/photos/4230630/pexels-photo-4230630.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  //   {
  //     id: 4,
  //     title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
  //     desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. A possimus excepturi aliquid nihil cumque ipsam facere aperiam at! Ea dolorem ratione sit debitis deserunt repellendus numquam ab vel perspiciatis corporis!',
  //     img: 'https://images.pexels.com/photos/6157049/pexels-photo-6157049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //   },
  // ];

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
                  <img src={post.img} alt="img" />
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
