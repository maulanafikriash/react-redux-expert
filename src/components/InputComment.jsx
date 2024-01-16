// InputComment.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function InputComment({ authUserId, onAddComment }) {
  const [comment, setComment] = useState('');

  const onClickAddComment = () => {
    onAddComment(comment);
    setComment('');
  };

  const onChangeHandler = (event) => {
    setComment(event.target.value);
  };

  return (
    <div className="container mt-4" id="comment">
      <p className="h5 mb-3">Tulis Komentar</p>
      {authUserId ? (
        <div className="mb-3">
          <textarea
            className="form-control"
            type="text"
            rows={5}
            id="commentArea"
            value={comment}
            placeholder="Komen..."
            onChange={onChangeHandler}
          />
          <button
            type="button"
            className="btn btn-primary mt-2"
            onClick={() => onClickAddComment()}
          >
            Kirim
          </button>
        </div>
      ) : (
        <p>
          <Link to="/login">Silahkan login untuk berkomentar</Link>
        </p>
      )}
    </div>
  );
}

InputComment.propTypes = {
  authUserId: PropTypes.string.isRequired,
  onAddComment: PropTypes.func.isRequired,
};
