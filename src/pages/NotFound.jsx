/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFound from '../assets/notFound.webp';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5 mb-4">
      <img src={notFound} alt="notfound" className="img-fluid img-thumbnail" />
      <h4 className="mt-4">Maaf, halaman tujuan Anda tidak ditemukan</h4>
      <button
        type="button"
        className="btn btn-primary mt-3"
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
    </div>
  );
}
