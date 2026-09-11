import React, { useState } from 'react';
import './LoginPage.css';

function LoginPage() {
    // State variables pou email ak password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Fonksyon handleLogin
    const handleLogin = async () => {
        console.log("À l'intérieur de handleLogin");
        console.log(`Email: ${email}`);
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