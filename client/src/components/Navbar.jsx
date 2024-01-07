import React, { useContext } from 'react';
import Logo from '../img/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLog = async () => {
    if (currentUser) {
      await logout();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <img src={Logo} alt="logo" />
        </Link>
        <div className="links">
          <Link to="/?cat=art" className="link">
            <h6>ART</h6>
          </Link>
          <Link to="/?cat=science" className="link">
            <h6>SCIENCE</h6>
          </Link>
          <Link to="/?cat=technology" className="link">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link to="/?cat=cinema" className="link">
            <h6>CINEMA</h6>
          </Link>
          <Link to="/?cat=design" className="link">
            <h6>DESIGN</h6>
          </Link>
          <Link to="/?cat=food" className="link">
            <h6>FOOD</h6>
          </Link>
          <span>{currentUser && currentUser.username}</span>
          <span onClick={handleLog}>{currentUser ? 'Logout' : 'Login'}</span>
          {currentUser && (
            <span className="write">
              <Link className="link" to="/write">
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
