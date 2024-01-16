/* eslint-disable no-shadow */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import ListThread from '../components/ListThread';
import {
  asyncDownVotesThread,
  asyncNeutralVotesThread,
  asyncUpVotesThread,
} from '../states/threads/action';
import AddThreadButton from '../components/AddThreadButton';
import ListCategories from '../components/ListCategories';
import { setCategoriesActionCreator } from '../states/categories/action';

function HomePage() {
  const {
    threads = [],
    users = [],
    categories,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const onUpVotesHandler = (threadId) => {
    dispatch(asyncUpVotesThread(threadId));
  };
  const onDownVotesHandler = (threadId) => {
    dispatch(asyncDownVotesThread(threadId));
  };
  const onNeutralVotesHandler = ({ threadId, voteTypeBefore }) => {
    dispatch(asyncNeutralVotesThread({ threadId, voteTypeBefore }));
  };

  const onSetCategoryHandler = (category) => {
    if (categories === category) {
      dispatch(setCategoriesActionCreator(''));
    } else {
      dispatch(setCategoriesActionCreator(category));
    }
  };

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const listThread = threads
    .map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId),
      authUserId: authUser ? authUser.id : '',
    }))
    .filter((thread) => (categories ? thread.category === categories : true));
  return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <ListCategories
              onSetCategory={onSetCategoryHandler}
              threads={threads}
              categories={categories}
            />
          </div>
          <div className="col-md-6">
            <ListThread
              threads={listThread}
              onUpVotes={onUpVotesHandler}
              onDownVotes={onDownVotesHandler}
              onNeutralVotes={onNeutralVotesHandler}
            />
          </div>
        </div>
        <div className="fixed-bottom mb-4 me-4">
          <AddThreadButton />
        </div>
      </div>
  );
}

export default HomePage;
