/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/action';

export default function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  return (
    <div className="container mt-4 ">
      <h3 className="mb-3 mt-lg-5 pt-4 d-thr">Klasemen Pengguna Aktif</h3>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboards.map((leaderboard) => (
              <tr key={leaderboard.user.id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="me-3">
                      <img
                        src={leaderboard.user.avatar}
                        alt="Table Component"
                        className="rounded-circle"
                        style={{ width: '50px', height: '50px' }}
                      />
                    </div>
                    <div>
                      <div>{leaderboard.user.name}</div>
                      <div>{leaderboard.user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{leaderboard.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
