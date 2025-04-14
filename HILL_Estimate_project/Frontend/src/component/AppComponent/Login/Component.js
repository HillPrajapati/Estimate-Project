import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, loginUser } from '../../../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../../GlobalComponent/InputForm/Component';
import Button from '../../GlobalComponent/Button/Component';
import Loader from '../../SharedComponent/Loader/Component';
import ErrorModal from '../../SharedComponent/ErrorModal/Component';
import { setItem } from '../../../helper/localStorageHelper';
import './Component.css'
const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access Redux state (loading, error, user)
  const { error, user, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: credentials.email, password: credentials.password }));
  };

  if (user && user.token) {
    setItem('authToken', user.token)
    navigate('/dashboard');
  }
  const onCloseErrorModal = () => {
    dispatch(clearError())
  }
  return (
    <div className="login-container">
      {loading && <Loader />}
      {error && <ErrorModal message={error} onClose={onCloseErrorModal} />}
      {!loading && (
        <LoginForm
          email={credentials.email}
          password={credentials.password}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Login;


const LoginForm = ({ email, password, handleChange, handleSubmit }) => {
  return (
    < >
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <InputField
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={(e) => handleChange(e)}
        />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => handleChange(e)}
        />
        <Button type="submit">Login</Button>
        {/* Add link to register/signup page */}
        <div className="register-link">
          <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
      </form>
    </>
  );
};
