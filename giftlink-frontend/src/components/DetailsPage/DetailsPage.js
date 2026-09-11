import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import './DetailsPage.css';

function DetailsPage() {
    const { productId } = useParams();
    const navigate = useNavigate();

    const [gift, setGift] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Tâche 1: Vérifier l'authentification
        const authToken = sessionStorage.getItem('auth-token');
        if (!authToken) {
            navigate('/app/login');
            return;
        }

        // Tâche 3: Faire défiler vers le haut
        window.scrollTo(0, 0);

        // Tâche 2: Récupérer les détails du cadeau
        const fetchGiftDetails = async () => {
            try {
                const response = await fetch(`${urlConfig.backendUrl}/api/gifts/${productId}`);
                if (!response.ok) {
                    throw new Error(`Erreur HTTP: ${response.status}`);
                }
                const data = await response.json();
                setGift(data);
                setLoading(false);
            } catch (err) {
                // Tâche 7 (Gestion d'erreur): Afficher les erreurs
                setError(err.message || 'Impossible de charger les détails du cadeau.');
                setLoading(false);
            }
        };

        fetchGiftDetails();
    }, [productId, navigate]);

    // Tâche 4: Gérer le clic de retour
    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) {
        return <div className="container mt-5 text-center">Chargement des détails...</div>;
    }

    if (error) {
        return <div className="container mt-5 alert alert-danger">{error}</div>;
    }

    if (!gift) {
        return <div className="container mt-5 text-center">Aucun détail trouvé pour ce cadeau.</div>;
    }

    return (
        <div className="container mt-4 details-container">
            <button className="btn btn-secondary mb-4" onClick={handleBackClick}>
                &larr; Retour
            </button>

            <div className="card product-details-card">
                <div className="card-header bg-primary text-white">
                    <h2 className="details-title text-white m-0">{gift.name}</h2>
                </div>

                <div className="card-body">
                    <div className="row">
                        {/* Tâche 5: Afficher l'image du cadeau avec les nouvelles classes CSS */}
                        <div className="col-md-6 text-center">
                            <div className="image-placeholder-large">
                                {gift.image ? (
                                    <img src={gift.image} alt={gift.name} className="product-image-large img-fluid rounded" />
                                ) : (
                                    <div className="no-image-available-large">
                                        Aucune image disponible
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Tâche 6: Afficher les détails du cadeau */}
                        <div className="col-md-6">
                            <ul className="list-group list-group-flush mb-3">
                                <li className="list-group-item">
                                    <strong>Catégorie:</strong> {gift.category}
                                </li>
                                <li className="list-group-item">
                                    <strong>État:</strong> {gift.condition}
                                </li>
                                <li className="list-group-item">
                                    <strong>Âge:</strong> {gift.age ? `${gift.age} ans` : 'N/A'}
                                </li>
                                <li className="list-group-item">
                                    <strong>Date d'ajout:</strong> {gift.date_added ? new Date(gift.date_added * 1000).toLocaleDateString() : 'N/A'}
                                </li>
                            </ul>
                            <div className="mt-3">
                                <h5>Description:</h5>
                                <p className="text-muted">{gift.description}</p>
                            </div>
                        </div>
                    </div>

                    <hr className="my-4" />

                    {/* Tâche 7: Rendre la section des commentaires */}
                    <div className="comments-section mt-4">
                        <h4>Commentaires</h4>
                        {gift.comments && gift.comments.length > 0 ? (
                            gift.comments.map((comment, index) => (
                                <div key={index} className="card mb-2 bg-light">
                                    <div className="card-body py-2">
                                        <h6 className="card-subtitle mb-1 text-primary">{comment.author || 'Anonyme'}</h6>
                                        <p className="card-text mb-0">{comment.comment}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">Aucun commentaire pour le moment.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailsPage;