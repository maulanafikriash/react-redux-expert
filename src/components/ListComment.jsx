/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './ItemComment';

export default function ListComment({
  comments,
  onUpVotesComment,
  onNeutralVotesComment,
  onDownVotesComment,
}) {
  return (
    <div className="mt-4">
      <p className="font-weight-bold text-lg">{`Comments (${comments.length}): `}</p>
      <div className="d-flex flex-column gap-2 mt-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onUpVotesComment={onUpVotesComment}
            onDownVotesComment={onDownVotesComment}
            onNeutralVotesComment={onNeutralVotesComment}
          />
        ))}
      </div>
    </div>
  );
}

ListComment.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
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
    }),
  ).isRequired,
  onUpVotesComment: PropTypes.func.isRequired,
  onNeutralVotesComment: PropTypes.func.isRequired,
  onDownVotesComment: PropTypes.func.isRequired,
};
