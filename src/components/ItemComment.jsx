/* eslint-disable max-len */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-unresolved */
import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import parse from 'html-react-parser';
import { useSelector } from 'react-redux';
import postedAt from '../utils';

export default function itemComment({
  comment,
  onUpVotesComment,
  onDownVotesComment,
  onNeutralVotesComment,
}) {
  const { authUser = null } = useSelector((states) => states);

  const isCommentUpVotes = comment.upVotesBy.includes(authUser?.id);
  const isCommentDownVotes = comment.downVotesBy.includes(authUser?.id);

  const onUpVotesCommentClick = () => {
    if (!authUser?.id) {
      alert('Anda harus login dahulu');
      return;
    }
    onUpVotesComment(comment.id);
  };

  const onDownVotesCommentClick = () => {
    if (!authUser?.id) {
      alert('Anda harus login dahulu');
      return;
    }
    onDownVotesComment(comment.id);
  };

  const onNeutralVotesCommentClick = ({ voteTypeBefore }) => {
    if (!authUser?.id) {
      alert('Anda harus login dahulu');
      return;
    }
    onNeutralVotesComment({ commentId: comment.id, voteTypeBefore });
  };

  return (
    <div className="container mt-3 mb-4" key={comment.id}>
      <div className="row">
        <div className="col-md-1">
          <img src={comment.owner.avatar} alt="avatar" className="rounded-circle" style={{ width: '40px', height: '40px' }} />
        </div>
        <div className="col-md-11">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div>
              <strong>{comment.owner.name}</strong>
            </div>
            <div>{postedAt(comment.createdAt)}</div>
          </div>
          <div>{parse(comment.content)}</div>
          <div className="d-flex">
            {isCommentUpVotes ? (
              <div className="me-3">
                <AiFillLike
                  size={25}
                  onClick={() => onNeutralVotesCommentClick({ commentId: comment.id, voteTypeBefore: 1 })}
                />
                <p className="m-0">&nbsp;{comment.upVotesBy.length}</p>
              </div>
            ) : (
              <div className="me-3">
                <AiOutlineLike
                  size={25}
                  onClick={() => onUpVotesCommentClick(comment.id)}
                />
                <p className="m-0">&nbsp;{comment.upVotesBy.length}</p>
              </div>
            )}

            {isCommentDownVotes ? (
              <div className="me-3">
                <AiFillDislike
                  size={25}
                  onClick={() => onNeutralVotesCommentClick({ commentId: comment.id, voteTypeBefore: -1 })}
                />
                <p className="m-0">&nbsp;{comment.downVotesBy.length}</p>
              </div>
            ) : (
              <div className="me-3">
                <AiOutlineDislike
                  size={25}
                  onClick={() => onDownVotesCommentClick(comment.id)}
                />
                <p className="m-0">&nbsp;{comment.downVotesBy.length}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

itemComment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
    upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onNeutralVotesComment: PropTypes.func.isRequired,
  onUpVotesComment: PropTypes.func.isRequired,
  onDownVotesComment: PropTypes.func.isRequired,
};
