/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable no-unneeded-ternary */
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function AddThreadButton({ onClick }) {
  const { authUser } = useSelector((states) => states);
  const navigate = useNavigate();

  if (!authUser) return null;

  return (
    <div className="position-fixed bottom-0 end-0 p-3">
      <button
        id="addThreadButton"
        className="btn btn-primary rounded-circle"
        onClick={onClick ? onClick : () => navigate('/new')}
      >
        <AiOutlinePlus size={22} />
      </button>
    </div>
  );
}

AddThreadButton.propTypes = {
  onClick: PropTypes.func,
};
