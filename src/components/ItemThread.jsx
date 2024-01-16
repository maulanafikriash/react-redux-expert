/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { BiCommentDetail } from 'react-icons/bi';
import parse from 'html-react-parser';
import postedAt from '../utils';

export default function ItemThread({
  threadId,
  title,
  createdAt,
  body,
  category,
  upVotesBy,
  downVotesBy,
  authUserId,
  totalComments,
  owner,
  onDownVotes,
  onUpVotes,
  onNeutralVotes,
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
    <div className="container mt-4 pt-3">
      <div className="mb-1">
        <h6># {category}</h6>
      </div>
      <Link to={`/threads/${threadId}`} className="text-decoration-none text-dark h4">
        <h4 className="mb-4 mt-2">
          {title}
        </h4>
      </Link>
      <div className="line-clamp-5 mb-4">{parse(body)}</div>
      <div className="d-flex justify-content-between align-items-center mb-4">
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
            <div className="me-3">
              <AiFillDislike
                size={25}
                onClick={() => onNeutralVotesClick({ threadId, voteTypeBefore: -1 })}
              />
              <p className="m-0">&nbsp;{downVotesBy.length}</p>
            </div>
          ) : (
            <div className="me-3">
              <AiOutlineDislike
                size={25}
                onClick={() => onDownVotesClick(threadId)}
              />
              <p className="m-0">&nbsp;{downVotesBy.length}</p>
            </div>
          )}

          <div>
            <HashLink
              scroll={(el) => el.scrollIntoView({ behavior: 'smooth' })}
              to={`/threads/${threadId}#comment`}
              className="text-decoration-none"
            >
              <BiCommentDetail
                size={25}
              />
            </HashLink>
            <p className="m-0">&nbsp;{totalComments}</p>
          </div>
        </div>
        <div className="text-muted">Dibuat oleh {owner.name || 'null'}</div>
        <div className="text-muted">{postedAt(createdAt)}</div>
      </div>
    </div>
  );
}

ItemThread.propTypes = {
  threadId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  authUserId: PropTypes.string.isRequired,
  onNeutralVotes: PropTypes.func.isRequired,
  onUpVotes: PropTypes.func.isRequired,
  onDownVotes: PropTypes.func.isRequired,
};
