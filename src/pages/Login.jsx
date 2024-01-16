/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import InputLogin from '../components/InputLogin';

function LoginPage() {
  const { authUser = null } = useSelector((states) => states);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLoginHandler = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
    navigate('/');
  };

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  if (authUser) return null;

  return (
    <div className="container-fluid mt-5 d-flex justify-content-center align-items-center">
      <div className="card mt-5 bg-color">
        <div className="card-body p-2">
          <InputLogin onLogin={onLoginHandler} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
