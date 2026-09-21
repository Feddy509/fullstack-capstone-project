import React, { useState, useEffect } from 'react';
import './LoginPage.css';

// Task 1 (Step 1): Import urlConfig from giftlink-frontend/src/config.js
import { urlConfig } from '../../config';

// Task 2 (Step 1): Import useAppContext from AuthContext
import { useAppContext } from '../../context/AuthContext';

// Task 3 (Step 1): Import useNavigate from react-router-dom
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    // State variables pou email ak password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Task 4 (Step 1): Include a state for incorrect password / error message
    const [incorrect, setIncorrect] = useState('');

    // Task 5 (Step 1): Create local variables for navigate, bearerToken, and setIsLoggedIn
    const navigate = useNavigate();
    const bearerToken = sessionStorage.getItem('bearer-token');
    const { setIsLoggedIn } = useAppContext();

    // Task 6 (Step 1): If bearerToken or auth-token has a value (user already logged in), navigate to MainPage
    useEffect(() => {
        if (sessionStorage.getItem('auth-token') || bearerToken) {
            navigate('/app');
        }
    }, [navigate, bearerToken]);

    // Fonksyon handleLogin
    const handleLogin = async (e) => {
        if (e) e.preventDefault();

        try {
            // Step 1: Perform fetch request
            const res = await fetch(`${urlConfig.backendUrl}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    'Authorization': bearerToken ? `Bearer ${bearerToken}` : '',
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });

            // Step 2 - Task 1: Access data coming from fetch API
            const json = await res.json();

            if (json.authtoken) {
                // Step 2 - Task 2: Set user details in sessionStorage
                sessionStorage.setItem('auth-token', json.authtoken);
                sessionStorage.setItem('name', json.userName);
                sessionStorage.setItem('email', json.userEmail);

                // Step 2 - Task 3: Set the user's state to log in using useAppContext
                setIsLoggedIn(true);

                // Step 2 - Task 4: Navigate to the MainPage after logging in
                navigate('/app');
            } else {
                // Step 2 - Task 5: Clear input and set an error message if password/user is incorrect
                document.getElementById("email").value = "";
                document.getElementById("password").value = "";
                setEmail("");
                setPassword("");
                setIncorrect("Wrong password. Try again.");

                // Clear out error message after 2 seconds
                setTimeout(() => {
                    setIncorrect("");
                }, 2000);
            }
        } catch (e) {
            console.log("Error fetching details: " + e.message);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="login-card p-4 border rounded">
                        <h2 className="text-center mb-4 font-weight-bold">Login</h2>

                        {/* Input pou Email */}
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                id="email"
                                type="text"
                                className="form-control"
                                placeholder="Entrez votre email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Input pou Password */}
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label">Mot de passe</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Entrez votre mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Step 2 - Task 6: Display an error message to the user */}
                            <span style={{ color: 'red', height: '.5cm', display: 'block', fontStyle: 'italic', fontSize: '12px' }}>
                                {incorrect}
                            </span>
                        </div>

                        {/* Bouton Connexion */}
                        <button className="btn btn-primary w-100 mb-3" onClick={handleLogin}>
                            Se connecter
                        </button>

                        <p className="mt-4 text-center">
                            Nouveau membre ? <a href="/app/register" className="text-primary">S'inscrire</a>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;