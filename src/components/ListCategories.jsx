/* eslint-disable no-shadow */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PropTypes from 'prop-types';

export default function ListCategories({ onSetCategory, threads }) {
  const ListCategories = threads.map((thread) => thread.category);
  const uniqueListCategories = [...new Set(ListCategories)];

  return (
    <div className="container q-card">
      <div className="card mt-lg-5">
        <div className="card-body">
          <h5 className="card-title">Pilih tag berdasarkan kategori</h5>
          <div className="d-flex flex-wrap">
            {uniqueListCategories.map((category) => (
              <button
                key={category}
                type="button"
                className="btn btn-outline-primary me-2 mb-2"
                onClick={() => onSetCategory(category)}
              >
                #{category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

ListCategories.propTypes = {
  onSetCategory: PropTypes.func.isRequired,
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      ownerId: PropTypes.string.isRequired,
      totalComments: PropTypes.number.isRequired,
      upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
      downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
  ).isRequired,
};
