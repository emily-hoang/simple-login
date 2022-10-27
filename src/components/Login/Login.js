import React, { useEffect, useState, useReducer, useContext } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import AuthContext from '../Auth/auth-context';

const reduceEmailFn = (emailState, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.includes('@')};
  } else if (action.type === 'BLUR_INPUT') {
    return { value: emailState.value, isValid: emailState.value.includes('@')};
  }
  return { value: '', isValid: false };
};

const reducePasswordFn = (passwordState, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.value, isValid: action.value.trim().length > 6};
  } else if (action.type === 'BLUR_INPUT') {
    return { value: passwordState.value, isValid: passwordState.value.trim().length > 6};
  }
  return { value: '', isValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);
  const [emailState, dispatchEmailFn] = useReducer(reduceEmailFn, {value: '', vailid: false});
  const [passwordState, dispatchPasswordFn] = useReducer(reducePasswordFn, {value: '', isValid: false});
  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmailFn({type: 'USER_INPUT', value: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordFn({type: 'USER_INPUT', value: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmailFn({type: 'BLUR_INPUT'})
  };

  const validatePasswordHandler = () => {
    dispatchPasswordFn({type: 'BLUR_INPUT'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    authContext.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          label="E-Mail"
          type="email"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          suggestedValue="user-email"
        ></Input>
        <Input
          id="password"
          label="Password"
          type="password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          suggestedValue="Currentpass1"
        ></Input>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
