/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-closing-tag-location */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { FaHome, FaTrophy } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Loading from './Loading';

export default function Navbar({ onLogoutHandler, authUserId }) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-color fixed-top">
      <div className="container">
        <h2 className="navbar-brand">DiskusiYuk App</h2>
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
          <ul className="navbar-nav nav-underline">
            <li
              className={`nav-item ${
                window.location.pathname === '/' ? 'active' : ''
              }`}
            >
              <Link className="nav-link" to="/">
                <FaHome size={20} />
                <span className="navbar-text">Home</span>
              </Link>
            </li>
            <li
              className={`nav-item ${
                window.location.pathname === '/leaderboards' ? 'active' : ''
              }`}
            >
              <Link className="nav-link" to="/leaderboards">
                <FaTrophy size={20} />
                <span className="navbar-text">Leaderboards</span>
              </Link>
            </li>
          </ul>
          <ul
            className={`navbar-nav ms-auto ${
              window.location.pathname === '/login' ? 'active' : ''
            }`}
          >
            <li className="nav-item">
              <button
                type="button"
                className="btn btn-outline-light"
                onClick={
                  authUserId ? onLogoutHandler : () => navigate('/login')
                }
              >
                {!authUserId ? (
                  <AiOutlineLogin size={20} />
                ) : (
                  <AiOutlineLogout size={20} />
                )}
                <span className="auth-l">
                  {authUserId ? 'Logout' : 'Login'}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <Loading />
    </nav>
  );
}

Navbar.propTypes = {
  onLogoutHandler: PropTypes.func.isRequired,
  authUserId: PropTypes.string.isRequired,
};
