/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-curly-newline */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from 'react-icons/ai';
import parse from 'html-react-parser';
import postedAt from '../utils';
import CommentInput from './InputComment';
import CommentsList from './ListComment';

export default function DetailThread({
  threadId,
  title,
  body,
  category,
  createdAt,
  comments,
  owner,
  upVotesBy,
  downVotesBy,
  authUserId,
  onDownVotes,
  onNeutralVotes,
  onUpVotes,
  onUpVotesComment,
  onDownVotesComment,
  onAddComment,
  onNeutralVotesComment,
}) {
  const isThreadUpVotes = upVotesBy.includes(authUserId);
  const isThreadDownVotes = downVotesBy.includes(authUserId);

  const onUpVotesClick = () => {
    if (!authUserId) {
      alert('Anda harus login dahulu');
      return;
    }
    onUpVotes(threadId);
  };

  const onDownVotesClick = () => {
    if (!authUserId) {
      alert('Anda harus login dahulu');
      return;
    }
    onDownVotes(threadId);
  };

  const onNeutralVotesClick = ({ voteTypeBefore }) => {
    if (!authUserId) {
      alert('Anda harus login dahulu');
      return;
    }
    onNeutralVotes({ threadId, voteTypeBefore });
  };

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <p className="h5">#{category}</p>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <img src={owner.avatar} alt="avatar profile" className="rounded-circle me-3" style={{ width: '40px', height: '40px' }} />
        <h1 className="h4">{owner.name}</h1>
      </div>
      <div className="mb-3">
        <h2 className="h3">{title}</h2>
      </div>
      <div className="mb-3">{parse(body)}</div>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <div className="d-flex">
          {isThreadUpVotes ? (
            <div className="me-3">
              <AiFillLike
                size={25}
                onClick={() => onNeutralVotesClick({ threadId, voteTypeBefore: 1 })}
              />
              <p className="m-0">&nbsp;{upVotesBy.length}</p>
            </div>
          ) : (
            <div className="me-3">
              <AiOutlineLike
                size={25}
                onClick={() => onUpVotesClick(threadId)}
              />
              <p className="m-0">&nbsp;{upVotesBy.length}</p>
            </div>
          )}

          {isThreadDownVotes ? (
            <div>
              <AiFillDislike
                size={25}
                onClick={() => onNeutralVotesClick({ threadId, voteTypeBefore: -1 })}
              />
              <p className="m-0">&nbsp;{downVotesBy.length}</p>
            </div>
          ) : (
            <div>
              <AiOutlineDislike
                size={25}
                onClick={() => onDownVotesClick(threadId)}
              />
              <p className="m-0">&nbsp;{downVotesBy.length}</p>
            </div>
          )}
        </div>
        <div>{postedAt(createdAt)}</div>
      </div>

      <CommentInput authUserId={authUserId} onAddComment={onAddComment} />
      <CommentsList
        comments={comments}
        onUpVotesComment={onUpVotesComment}
        onDownVotesComment={onDownVotesComment}
        onNeutralVotesComment={onNeutralVotesComment}
      />
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

DetailThread.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      owner: PropTypes.shape(ownerShape).isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  authUserId: PropTypes.string.isRequired,
  onUpVotes: PropTypes.func.isRequired,
  onDownVotes: PropTypes.func.isRequired,
  onNeutralVotes: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
  onUpVotesComment: PropTypes.func.isRequired,
  onDownVotesComment: PropTypes.func.isRequired,
  onNeutralVotesComment: PropTypes.func.isRequired,
};
