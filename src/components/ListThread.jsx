/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ItemThread';

export default function ListThread({
  threads, onNeutralVotes, onUpVotes, onDownVotes,
}) {
  return (
    <div className="container mt-5">
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          threadId={thread.id}
          title={thread.title}
          category={thread.category}
          body={thread.body}
          createdAt={thread.createdAt}
          downVotesBy={thread.downVotesBy}
          upVotesBy={thread.upVotesBy}
          totalComments={thread.totalComments}
          owner={thread.owner}
          onNeutralVotes={onNeutralVotes}
          authUserId={thread.authUserId}
          onUpVotes={onUpVotes}
          onDownVotes={onDownVotes}
        />
      ))}
    </div>
  );
}

ListThread.propTypes = {
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      totalComments: PropTypes.number.isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,

  onUpVotes: PropTypes.func.isRequired,
  onNeutralVotes: PropTypes.func.isRequired,
  onDownVotes: PropTypes.func.isRequired,
};
