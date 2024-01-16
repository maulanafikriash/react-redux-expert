/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import InputThread from '../components/InputThread';
import { asyncAddThread } from '../states/threads/action';

export default function NewThreadPage() {
  const { authUser = null } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onAddThreadHandler = ({ title, body, category }) => {
    if (title === '' || body === '') {
      alert('Judul dan isi Thread wajib diisi');
      return;
    }
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  useEffect(() => {
    if (!authUser) {
      navigate('/');
    }
  }, [authUser, navigate]);

  if (!authUser) return null;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <InputThread onAddThread={onAddThreadHandler} />
        </div>
      </div>
    </div>
  );
}
