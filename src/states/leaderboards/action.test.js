/* eslint-disable no-undef */
import {
  describe, it, expect, vi,
} from 'vitest';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import {
  asyncGetLeaderboards,
  receiveLeaderboardsActionCreator,
} from './action';

/**
 * test scenario
 *
 * - asyncGetLeaderboards Thunk
 *  - should dispatch action correctly when get leaderboards success
 *  - should dispatch action and show alert correctly when get leaderboards failed
 */

const fakeGetLeaderBoardsResponse = [
  {
    user: {
      id: 'users-1',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 10,
  },
  {
    user: {
      id: 'users-2',
      name: 'Jane Doe',
      email: 'jane@example.com',
      avatar: 'https://generated-image-url.jpg',
    },
    score: 5,
  },
];

const fakeErrorResponse = new Error("Error can't get leaderboards");

describe('asyncGetLeaderboards Thunk', () => {
  beforeEach(() => {
    api._getLeaderboards = api.getLeaderboards;
  });

  afterEach(() => {
    api.getLeaderboards = api._getLeaderboards;
    delete api._getLeaderboards;
  });

  it('should dispatch action correctly when get leaderboards success', async () => {
    api.getLeaderboards = () => Promise.resolve(fakeGetLeaderBoardsResponse);
    const dispatch = vi.fn();
    await asyncGetLeaderboards()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(
      receiveLeaderboardsActionCreator(fakeGetLeaderBoardsResponse),
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and show alert correctly when get leaderboards failed', async () => {
    api.getLeaderboards = () => Promise.reject(fakeErrorResponse);
    const dispatch = vi.fn();
    console.log = vi.fn();
    await asyncGetLeaderboards()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(console.log).toHaveBeenCalledWith(fakeErrorResponse.message);
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
