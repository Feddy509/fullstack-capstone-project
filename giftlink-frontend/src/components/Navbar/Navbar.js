import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/app">GiftLink</a>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarNav" 
                    aria-controls="navbarNav" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        {/* Tâche 1 : Ajoutez des liens vers Home et Gifts */}
                        <li className="nav-item">
                            <a className="nav-link" href="/home.html">Home</a> {/* Link to home.html */}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/app">Gifts</a> {/* Updated Link */}
                        </li>
                        {/* Ajout du lien Search juste après Gifts */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/app/search">Search</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;