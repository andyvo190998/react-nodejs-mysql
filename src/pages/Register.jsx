import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [errorState, setErrorState] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((previous) => ({ ...previous, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:8800/api/auth/register',
        inputs
      );
      navigate('/login');
    } catch (err) {
      setErrorState(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          name="email"
          type="email"
          placeholder="email"
          onChange={handleChange}
        />
        <input
          required
          name="password"
          type="password"
          placeholder="password"
          onChange={handleChange}
        />
        {/* <input required type="password" placeholder="repeat password" /> */}
        <button onClick={handleSubmit} type="submit">
          Register
        </button>
        <p>{errorState}</p>
        <span>
          Don you have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
