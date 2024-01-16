/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputRegister from '../components/InputRegister';
import { asyncRegisterUser } from '../states/users/action';

export default function RegisterPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegisterHandler = async ({
    name, email, password, confirmPassword,
  }) => {
    if (password !== confirmPassword) {
      alert('konfirmasi password tidak cocok');
      return;
    }

    try {
      await dispatch(asyncRegisterUser({ name, email, password }));
      alert('Berhasil mendaftarkan pengguna');
      navigate('/login');
    } catch (error) {
      if (error.message) {
        alert('Email sudah terdaftar, Silakan gunakan email lain.');
      }
    }
  };

  useEffect(() => {
    if (authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  if (authUser) return null;

  return (
    <div className="container-fluid mt-5 d-flex justify-content-center align-items-center">
      <div className="card mt-4 bg-color">
        <div className="card-body p-2">
          <InputRegister onRegister={onRegisterHandler} />
        </div>
      </div>
    </div>
  );
}
