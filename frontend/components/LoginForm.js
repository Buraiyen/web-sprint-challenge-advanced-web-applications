import React, { useState } from 'react';
import PT from 'prop-types';

const initialFormValues = {
  username: '',
  password: '',
};
export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  // ✨ where are my props? Destructure them here

  const inputChangeHandler = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
    setButtonDisabled(
      !(values.username.trimEnd() >= 3 && values.password.trimEnd() >= 8)
    );
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    // ✨ implement
  };

  const isDisabled = () => {
    // ✨ implement
    // Trimmed username must be >= 3, and
    // trimmed password must be >= 8 for
    // the button to become enabled
    return;
  };

  return (
    <form id='loginForm' onSubmit={onSubmit}>
      <h2>Login</h2>
      <input
        maxLength={20}
        value={values.username}
        onChange={inputChangeHandler}
        placeholder='Enter username'
        id='username'
      />
      <input
        maxLength={20}
        value={values.password}
        onChange={inputChangeHandler}
        placeholder='Enter password'
        id='password'
      />
      <button disabled={buttonDisabled} id='submitCredentials'>
        Submit credentials
      </button>
    </form>
  );
}

// 🔥 No touchy: LoginForm expects the following props exactly:
LoginForm.propTypes = {
  login: PT.func.isRequired,
};
