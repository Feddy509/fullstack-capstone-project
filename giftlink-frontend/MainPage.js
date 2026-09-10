import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';

function MainPage() {
    const [gifts, setGifts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Tâche 1 : Récupération des cadeaux
        const fetchGifts = async () => {
            try {
                let url = `${urlConfig.backendUrl}/api/gifts`;
                const response = await fetch(url);
                if (!response.ok) {
                    // something went wrong
                    throw new Error(`HTTP error; ${response.status}`);
                }
                const data = await response.json();
                setGifts(data);
            } catch (error) {
                console.log('Fetch error: ' + error.message);
            }
        };

        fetchGifts();
    }, []);

    // Tâche 2 : Accéder à la page des détails
    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    // Tâche 3 : Formatage de l'horodatage
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return date.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Available Gifts</h2>
            <div className="row">
                {gifts.map((gift) => (
                    <div key={gift.id || gift._id} className="col-md-4 mb-4">
                        <div className="card h-100 shadow-sm">
                            
                            {/* Tâche 4 : Afficher l'image du cadeau ou un espace réservé */}
                            <div className="image-placeholder">
                                {gift.image ? (
                                    <img src={gift.image} alt={gift.name} className="card-img-top" />
                                ) : (
                                    <div className="no-image-available">No Image Available</div>
                                )}
                            </div>

                            <div className="card-body d-flex flex-column">
                                {/* Tâche 5 : Afficher le nom du cadeau */}
                                <h5 className="card-title">{gift.name}</h5>

                                {/* Tâche 6 : Afficher la date formatée */}
                                <p className="card-text">{formatDate(gift.date_added)}</p>

                                <button 
                                    className="btn btn-primary mt-auto" 
                                    onClick={() => goToDetailsPage(gift.id || gift._id)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MainPage;