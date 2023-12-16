// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import SigninSignup from './components/SiginSignup'
import { useSelector } from 'react-redux';
import NotFound from './components/NotFound';
function App() {
  const { name, email, password, token, isUser } = useSelector((state) => state.login);
  const CheckAuth = () => {
    // if(!isUser||!token)
    // return <Navigate to="/siginsignup" />
    // else 
    return <></>
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />

          } />
          <Route path="/Home" element={<Home />

          } />
          <Route
            path="/login"
            element={
              <div>
                <Login />
                <Link to="/signup">Go to Signup</Link>
              </div>
            }
          />
          <Route
            path="/signup"
            element={
              <div>
                <Signup />
                <Link to="/login">Go to Login</Link>
              </div>
            }
          />
          <Route
            path="/siginsignup"
            element={
              <div>
                <SigninSignup />

              </div>
            }
          />
          <Route path="*" element={<NotFound/>} />
        </Routes>
        {CheckAuth()}
      </div>

    </Router>
  );
}

export default App;
