// InputRegister
import React from 'react';
import PropTypes from 'prop-types';
import useInput from '../hooks/useInput';

export default function InputRegister({ onRegister }) {
  const [name, setName] = useInput('');
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');
  const [confirmPassword, setConfirmPassword] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onRegister({
      name, email, password, confirmPassword,
    });
  };

  return (
    <div className="container mt-2">
      <div className="card">
        <div className="card-body pe-5">
          <h1 className="card-title mb-4 text-center">Register</h1>
          <form onSubmit={onSubmitHandler}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
                <input
                  type="text"
                  id="name"
                  value={name}
                  className="form-control"
                  placeholder="Your Name"
                  onChange={setName}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="form-control"
                  placeholder="email@example.com"
                  onChange={setEmail}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
                <input
                  type="password"
                  id="password"
                  value={password}
                  className="form-control"
                  placeholder="******"
                  data-testid="password"
                  onChange={setPassword}
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  className="form-control"
                  placeholder="******"
                  data-testid="confirmPassword"
                  onChange={setConfirmPassword}
                  required
                />
              </label>
            </div>
            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary"
                data-testid="registerButton"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

InputRegister.propTypes = {
  onRegister: PropTypes.func.isRequired,
};
