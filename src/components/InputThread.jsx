import PropTypes from 'prop-types';
import React, { useState } from 'react';

export default function InputThread({ onAddThread }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');

  const handleTitleChange = (eve) => setTitle(eve.target.value);
  const handleCategoryChange = (eve) => setCategory(eve.target.value);
  const handleBodyChange = (eve) => setBody(eve.target.value);

  const handleAddThread = () => {
    onAddThread({ title, body, category });
    // Reset the input values after adding a thread if needed
    setTitle('');
    setBody('');
    setCategory('');
  };

  return (
    <div className="container mt-4 pt-4">
      <h1 className="mb-4">Buat Diskusi Baru</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={title}
          placeholder="Judul"
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          value={category}
          placeholder="Category"
          onChange={handleCategoryChange}
        />
      </div>
      <div className="mb-3">
        <textarea
          type="text"
          rows={5}
          className="form-control"
          value={body}
          data-testid="textArea"
          placeholder="Tuliskan Sesuatu ..."
          onChange={handleBodyChange}
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleAddThread}
      >
        Buat
      </button>
    </div>
  );
}

InputThread.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};
