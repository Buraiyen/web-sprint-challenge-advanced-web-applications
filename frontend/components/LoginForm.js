import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PT from 'prop-types';
import axios from 'axios';

const initialFormValues = {
  username: '',
  password: '',
};

export default function LoginForm(props) {
  const [values, setValues] = useState(initialFormValues);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const navigate = useNavigate();

  // ✨ where are my props? Destructure them here
  useEffect(() => {
    setButtonDisabled(
      !(
        values.username.trim().length >= 3 && values.password.trim().length >= 8
      )
    );
  }, [values]);

  const inputChangeHandler = (evt) => {
    const { id, value } = evt.target;
    setValues({ ...values, [id]: value });
  };

  const onSubmit = (evt) => {
    props.setSpinnerOn(true);
    evt.preventDefault();
    // ✨ implement
    const URL = 'http://localhost:9000/api/login';
    // creds: Learner Bloomtech
    axios
      .post(URL, values)
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        navigate('/articles');
        props.setSpinnerOn(false);
      })
      .catch((err) => {
        console.error(`UH OH ERROR: ${err}`);
        props.setSpinnerOn(false);
      });
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
