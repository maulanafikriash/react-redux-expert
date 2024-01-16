/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import DetailThread from '../components/DetailThread';
import {
  asyncUpVotesDetailThread,
  asyncAddCommentDetailThread,
  asyncReceiveDetailThread,
  asyncNeutralVotesDetailThread,
  asyncDownVotesDetailThread,
  asyncNeutralVotesComment,
  asyncUpVotesComment,
  asyncDownVotesComment,
} from '../states/detailThread/action';

export default function DetailThreadPage() {
  const { detailThread = null, authUser = null } = useSelector(
    (states) => states,
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  const onUpVotesHandler = (threadId) => {
    dispatch(asyncUpVotesDetailThread(threadId));
  };
  const onDownVotesHandler = (threadId) => {
    dispatch(asyncDownVotesDetailThread(threadId));
  };
  const onNeutralVotesHandler = ({ threadId, voteTypeBefore }) => {
    dispatch(asyncNeutralVotesDetailThread({ threadId, voteTypeBefore }));
  };

  const onAddCommentHandler = (comment) => {
    dispatch(asyncAddCommentDetailThread({ id, content: comment }));
  };

  const onUpVotesCommentHandler = (commentId) => {
    dispatch(asyncUpVotesComment({ threadId: detailThread?.id, commentId }));
  };
  const onDownVotesCommentHandler = (commentId) => {
    dispatch(asyncDownVotesComment({ threadId: detailThread?.id, commentId }));
  };
  const onNeutralVotesCommentHandler = ({ commentId, voteTypeBefore }) => {
    dispatch(
      asyncNeutralVotesComment({
        threadId: detailThread?.id,
        commentId,
        voteTypeBefore,
      }),
    );
  };

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));
  }, [dispatch]);

  if (!detailThread) return null;

  return (
    <div className="container mt-lg-5 pt-3 d-thr">
      <DetailThread
        authUserId={authUser?.id || ''}
        threadId={detailThread.id}
        title={detailThread.title}
        body={detailThread.body}
        category={detailThread.category}
        createdAt={detailThread.createdAt}
        owner={detailThread.owner}
        downVotesBy={detailThread.downVotesBy}
        upVotesBy={detailThread.upVotesBy}
        onUpVotes={onUpVotesHandler}
        comments={detailThread.comments}
        onDownVotes={onDownVotesHandler}
        onNeutralVotes={onNeutralVotesHandler}
        onUpVotesComment={onUpVotesCommentHandler}
        onAddComment={onAddCommentHandler}
        onDownVotesComment={onDownVotesCommentHandler}
        onNeutralVotesComment={onNeutralVotesCommentHandler}
      />
    </div>
  );
}
