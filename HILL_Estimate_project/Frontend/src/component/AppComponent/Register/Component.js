import React, { useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/actions/userActions';
import { Link, useNavigate } from 'react-router-dom';
import ErrorModal from '../../SharedComponent/ErrorModal/Component';
import Loader from '../../SharedComponent/Loader/Component';
import './Component.css'
// Lazy load components
const InputField = lazy(() => import('../../GlobalComponent/InputForm/Component'));
const SelectField = lazy(() => import('../../GlobalComponent/Select/Component'));
const Button = lazy(() => import('../../GlobalComponent/Button/Component'));

const Register = () => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user, loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(userData));
  };

  if (user) {
    navigate('/');
  }

  return (
    <div className='register-container'>
      <div className='register-header'>
        <h2>Register</h2>
      </div>
      {loading && <Loader />}
      {error && <ErrorModal />}
      {!loading && (
        <RegisterForm
          userData={userData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default Register;



const RegisterForm = ({ userData, handleChange, handleSubmit }) => {
  return (
    <Suspense fallback={<Loader />}>
      <form onSubmit={handleSubmit} className='register-form'>
        <InputField
          type="text"
          placeholder="First Name"
          name="firstName"
          value={userData.firstName}
          onChange={handleChange}
        />
        <InputField
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={userData.lastName}
          onChange={handleChange}
        />
        <InputField
          type="email"
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <InputField
          type="password"
          placeholder="Password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        <SelectField
          name="gender"
          value={userData.gender}
          onChange={handleChange}
          options={['Male', 'Female', 'Other']}
        />
        <Button type="submit">Register</Button>
        {/* Add a link to the login page */}
       <div className="login-link">
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
      </form>
       
    </Suspense>
  );
};

