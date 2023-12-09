// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import SigninSignup from './components/SiginSignup'

function App() {
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
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
