/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable quotes */
// InputLogin.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';

export default function InputLogin({ onLogin }) {
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className="container-fluid mt-2">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4 text-center">Login</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  value={email}
                  placeholder="youremail@example.com"
                  onChange={setEmail}
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  value={password}
                  placeholder="******"
                  onChange={setPassword}
                />
              </label>
            </div>
            <div className="mb-3 text-center">
              <span>
                Belum punya akun?{' '}
                <Link to="/register">Daftar di sini</Link>
              </span>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                id="loginUser"
                className="btn btn-primary"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

InputLogin.propTypes = {
  onLogin: PropTypes.func.isRequired,
};
