// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import SigninSignup from './components/SiginSignup'
import { useSelector } from 'react-redux';
import NotFound from './components/NotFound';
import JoinFolder from './components/JoinFolder';
function App() {
  const { name, email, password, token, isUser } = useSelector((state) => state.login);
  const CheckAuth = () => {
     if(!isUser||!token)
       return <Navigate to="/siginsignup" />
     else 
      return <></>
  }
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/joinfolder/:id" element={<JoinFolder/>}/>
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
