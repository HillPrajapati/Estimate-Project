// component/AppComponent/Logout/Component.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeItem } from '../../../helper/localStorageHelper'; // Import the removeItem function
import { useDispatch } from 'react-redux';
import { clearUserState } from '../../../redux/actions/userActions';
import { clearDepartmentState } from '../../../redux/actions/departmentActions';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    // Remove the authKey from localStorage
    removeItem('authToken');
    dispatch(clearUserState())
    dispatch(clearDepartmentState())

    // Redirect to the login page after logout
    navigate('/');
  }, [navigate]);

  return null; // This component does not render anything
};

export default Logout;
