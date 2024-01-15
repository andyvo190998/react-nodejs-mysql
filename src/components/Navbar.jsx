import React, { useContext } from 'react';
import Logo from '../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout, setSelectedCat, selectedCat } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleLog = async () => {
    setSelectedCat(null);
    if (currentUser) {
      await logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <Link onClick={() => setSelectedCat(null)} to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="links">
          <Link
            onClick={() => setSelectedCat('art')}
            to="/?cat=art"
            className="link"
          >
            <h6
              style={{
                borderBottom: selectedCat === 'art' && '1px solid teal',
                color: selectedCat === 'art' && 'teal',
              }}
            >
              ART
            </h6>
          </Link>
          <Link
            onClick={() => setSelectedCat('science')}
            to="/?cat=science"
            className="link"
          >
            <h6
              style={{
                borderBottom: selectedCat === 'science' && '1px solid teal',
                color: selectedCat === 'science' && 'teal',
              }}
            >
              SCIENCE
            </h6>
          </Link>
          <Link
            onClick={() => setSelectedCat('technology')}
            to="/?cat=technology"
            className="link"
          >
            <h6
              style={{
                borderBottom: selectedCat === 'technology' && '1px solid teal',
                color: selectedCat === 'technology' && 'teal',
              }}
            >
              TECHNOLOGY
            </h6>
          </Link>
          <Link
            onClick={() => setSelectedCat('cinema')}
            to="/?cat=cinema"
            className="link"
          >
            <h6
              style={{
                borderBottom: selectedCat === 'cinema' && '1px solid teal',
                color: selectedCat === 'cinema' && 'teal',
              }}
            >
              CINEMA
            </h6>
          </Link>
          <Link
            onClick={() => setSelectedCat('design')}
            to="/?cat=design"
            className="link"
          >
            <h6
              style={{
                borderBottom: selectedCat === 'design' && '1px solid teal',
                color: selectedCat === 'design' && 'teal',
              }}
            >
              DESIGN
            </h6>
          </Link>
          <Link
            onClick={() => setSelectedCat('food')}
            to="/?cat=food"
            className="link"
          >
            <h6
              style={{
                borderBottom: selectedCat === 'food' && '1px solid teal',
                color: selectedCat === 'food' && 'teal',
              }}
            >
              FOOD
            </h6>
          </Link>
          <span>{currentUser && currentUser.username}</span>
          <span onClick={handleLog}>{currentUser ? 'Logout' : 'Login'}</span>
          {currentUser && (
            <span className="write">
              <Link
                onClick={() => setSelectedCat(null)}
                className="link"
                to="/write"
              >
                Write
              </Link>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
