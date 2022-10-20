import React, { useState, useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './components/Auth/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  /* useEffect() - 1st param - An effect function which will be executed after the component is rendered,
  and call it after performing the DOM updates.
  - 2nd param - The dependency list.
  When there are no dependency, the effect will be ran for every render includes the 1st one.
  When it's an empty list e.g [], the effect function will only be executed and cleaned up once after the 1st render.
  OPTIMIZATION: Make sure the array includes all values from the component scope (such as props and state) that change over time and that are used by the effect.
  */
  useEffect(() => {
    const storedUserLoggedInInfo = localStorage.getItem("isLoggedIn");

    if (storedUserLoggedInInfo === "1") {
      setIsLoggedIn(true);
    }
  }, [])

  const loginHandler = (email, password) => {
    // We should of course check email and password
    // But it's just a dummy/ demo anyways
    localStorage.setItem("isLoggedIn", "1")
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler }}>
      <MainHeader />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
