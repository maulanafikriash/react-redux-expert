import { showLoading, hideLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREADS: 'threads/receive',
  NEUTRAL_VOTES_THREADS: 'threads/neutralVotes',
  UP_VOTES_THREADS: 'threads/upVotes',
  DOWN_VOTES_THREADS: 'threads/downVotes',
  ADD_THREAD: 'threads/add',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVotesThreadCreator({ threadId, authUserId }) {
  return {
    type: ActionType.UP_VOTES_THREADS,
    payload: {
      threadId,
      authUserId,
    },
  };
}

function downVotesThreadCreator({ threadId, authUserId }) {
  return {
    type: ActionType.DOWN_VOTES_THREADS,
    payload: {
      threadId,
      authUserId,
    },
  };
}

function neutralVotesThreadCreator({ threadId, authUserId }) {
  return {
    type: ActionType.NEUTRAL_VOTES_THREADS,
    payload: {
      threadId,
      authUserId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncUpVotesThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    dispatch(showLoading());
    dispatch(upVotesThreadCreator({ threadId, authUserId: authUser.id }));
    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      const { downVotesBy } = threads.filter(
        (thread) => thread.id === threadId,
      )[0];
      if (downVotesBy.includes(authUser.id)) {
        dispatch(downVotesThreadCreator({ threadId, authUserId: authUser.id }));
      } else {
        dispatch(
          neutralVotesThreadCreator({ threadId, authUserId: authUser.id }),
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncDownVotesThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threads } = getState();
    dispatch(showLoading());
    dispatch(downVotesThreadCreator({ threadId, authUserId: authUser.id }));
    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      const { upVotesBy } = threads.filter(
        (thread) => thread.id === threadId,
      )[0];
      if (upVotesBy.includes(authUser.id)) {
        dispatch(upVotesThreadCreator({ threadId, authUserId: authUser.id }));
      } else {
        dispatch(
          neutralVotesThreadCreator({ threadId, authUserId: authUser.id }),
        );
      }
    }
    dispatch(hideLoading());
  };
}

function asyncNeutralVotesThread({ threadId, voteTypeBefore }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(showLoading());
    dispatch(neutralVotesThreadCreator({ threadId, authUserId: authUser.id }));
    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      if (voteTypeBefore === 1) {
        dispatch(upVotesThreadCreator({ threadId, authUserId: authUser.id }));
      }

      if (voteTypeBefore === -1) {
        dispatch(downVotesThreadCreator({ threadId, authUserId: authUser.id }));
      }
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  asyncAddThread,
  addThreadActionCreator,
  upVotesThreadCreator,
  neutralVotesThreadCreator,
  asyncUpVotesThread,
  asyncDownVotesThread,
  asyncNeutralVotesThread,
  downVotesThreadCreator,
};
