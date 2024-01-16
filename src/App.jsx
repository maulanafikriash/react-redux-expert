/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import DetailThreadPage from './pages/DetailThread';
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import LeaderboardsPage from './pages/Leaderboard';
import NewThreadPage from './pages/NewThread';
import NotFoundPage from './pages/NotFound';
import { asyncPreloadProcess } from './states/isPreload/action';
import { asyncUnsetAuthUser } from './states/authUser/action';

export default function App() {
  const { isPreload = false, authUser = null } = useSelector(
    (states) => states,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  const onLogoutHandler = () => {
    dispatch(asyncUnsetAuthUser());
    navigate('/login');
  };
  if (isPreload) {
    return null;
  }
  return (
    <>
      <header>
        <Navbar
        onLogoutHandler={onLogoutHandler}
        authUserId={authUser?.id || ''}
        />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/new" element={<NewThreadPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/threads/:id" element={<DetailThreadPage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
