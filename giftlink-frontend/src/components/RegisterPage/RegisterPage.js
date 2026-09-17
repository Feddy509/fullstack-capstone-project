import React, { useState } from 'react';
// Task 1 (Step 1): Import urlConfig from giftlink-frontend/src/config.js
import { urlConfig } from '../config';

// Task 2 (Step 1): Import useAppContext from giftlink-frontend/src/context/AuthContext.js
import { useAppContext } from '../context/AuthContext';

// Task 3 (Step 1): Import useNavigate from react-router-dom to handle navigation
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Task 4 (Step 1): Include a state for error message
  const [showerr, setShowerr] = useState('');

  // Task 5 (Step 1): Create a local variable for navigate and setIsLoggedIn
  const navigate = useNavigate();
  const { setIsLoggedIn } = useAppContext();

  const handleRegister = async () => {
    try {
      // Step 1: Implement API call
      const response = await fetch(`${urlConfig.backendUrl}/api/auth/register`, {
        // Task 6 (Step 1): Set method
        method: 'POST',

        // Task 7 (Step 1): Set headers
        headers: {
          'content-type': 'application/json',
        },

        // Task 8 (Step 1): Set body to send user details
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      });

      // Step 2: Access data, login, set the AuthContext and set user details
      
      // Task 1 (Step 2): Access data coming from fetch API
      const json = await response.json();

      if (json.authtoken) {
        // Task 2 (Step 2): Set user details
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('name', firstName);
        sessionStorage.setItem('email', json.email);

        // Task 3 (Step 2): Set the state of user to logged in using the useAppContext
        setIsLoggedIn(true);

        // Task 4 (Step 2): Navigate to the MainPage after logging in
        navigate('/app');
      } else {
        // Task 5 (Step 2): Set an error message if the registration fails
        if (json.error) {
          setShowerr(json.error);
        }
      }
    } catch (e) {
      console.log("Error fetching details: " + e.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Register</h2>

          {/* Task 6 (Step 2): Display error message to enduser */}
          <div className="text-danger">{showerr}</div>

          <div className="form-group mb-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="btn btn-primary" onClick={handleRegister}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;