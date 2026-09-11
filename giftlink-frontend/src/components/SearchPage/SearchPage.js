import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { urlConfig } from '../../config';
import './SearchPage.css';

function SearchPage() {
    // Tâche 1: Variables d'état
    const [searchQuery, setSearchQuery] = useState('');
    const [ageRange, setAgeRange] = useState(6);
    const [searchResults, setSearchResults] = useState([]);
    const [categories, setCategories] = useState([]);
    const [conditions, setConditions] = useState([]);

    const navigate = useNavigate();

    // Lister catégories ak conditions (données statiques ou récupérées)
    const categoriesList = ['Living', 'Bedroom', 'Bathroom', 'Kitchen', 'Office'];
    const conditionsList = ['New', 'Like New', 'Older'];

    useEffect(() => {
        setCategories(categoriesList);
        setConditions(conditionsList);
        // Récupérer tous les produits au montage initial
        fetchInitialGifts();
    }, []);

    const fetchInitialGifts = async () => {
        try {
            const response = await fetch(`${urlConfig.backendUrl}/api/gifts`);
            if (response.ok) {
                const data = await response.json();
                setSearchResults(data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des cadeaux:', error);
        }
    };

    // Tâche 2: Récupérer les résultats de recherche
    const handleSearch = async () => {
        const baseUrl = `${urlConfig.backendUrl}/api/search?`;
        const categoryVal = document.getElementById('categorySelect').value;
        const conditionVal = document.getElementById('conditionSelect').value;

        const queryParams = new URLSearchParams({
            name: searchQuery,
            age_years: ageRange,
            category: categoryVal,
            condition: conditionVal,
        }).toString();

        try {
            const response = await fetch(`${baseUrl}${queryParams}`);
            if (!response.ok) {
                throw new Error('Search failed');
            }
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Failed to fetch search results:', error);
        }
    };

    // Tâche 6: Naviguer vers la page de détails
    const goToDetailsPage = (productId) => {
        navigate(`/app/product/${productId}`);
    };

    return (
        <div className="container mt-5 search-container">
            <h2 className="mb-4">Rechercher des cadeaux</h2>

            <div className="search-filters-card p-4 border rounded bg-light mb-4">
                {/* Tâche 7: Champ de saisie de texte */}
                <div className="mb-3">
                    <label htmlFor="searchInput" className="form-label">Nom du cadeau</label>
                    <input
                        id="searchInput"
                        type="text"
                        className="form-control"
                        placeholder="Entrez le nom d'un cadeau..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="row">
                    {/* Tâche 3: Menu déroulant Catégorie */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="categorySelect" className="form-label">Catégorie</label>
                        <select id="categorySelect" className="form-select">
                            <option value="">Toutes</option>
                            {categories.map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tâche 3: Menu déroulant État (Condition) */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="conditionSelect" className="form-label">État</label>
                        <select id="conditionSelect" className="form-select">
                            <option value="">Tous</option>
                            {conditions.map((condition) => (
                                <option key={condition} value={condition}>{condition}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tâche 4: Curseur de tranche d'âge */}
                    <div className="col-md-4 mb-3">
                        <label htmlFor="ageRange" className="form-label">Âge : Moins de {ageRange} ans</label>
                        <input
                            type="range"
                            className="form-range"
                            id="ageRange"
                            min="1"
                            max="10"
                            value={ageRange}
                            onChange={(e) => setAgeRange(e.target.value)}
                        />
                    </div>
                </div>

                {/* Tâche 8: Bouton de recherche */}
                <button className="btn btn-primary w-100 mt-2" onClick={handleSearch}>
                    Rechercher
                </button>
            </div>

            {/* Tâche 5: Affichage des résultats */}
            <div className="search-results mt-4">
                {searchResults.length > 0 ? (
                    <div className="row">
                        {searchResults.map((product) => (
                            <div key={product.id || product._id} className="col-md-4 mb-4">
                                <div className="card h-100 shadow-sm">
                                    {product.image ? (
                                        <img src={product.image} alt={product.name} className="card-img-top search-card-img" />
                                    ) : (
                                        <div className="card-img-top bg-secondary text-white text-center py-5">
                                            Aucune image
                                        </div>
                                    )}
                                    <div className="card-body">
                                        <h5 className="card-title">{product.name}</h5>
                                        <p className="card-text">
                                            {product.description
                                                ? `${product.description.slice(0, 100)}...`
                                                : 'Pas de description.'}
                                        </p>
                                    </div>
                                    <div className="card-footer bg-transparent border-top-0 text-center">
                                        <button
                                            onClick={() => goToDetailsPage(product.id || product._id)}
                                            className="btn btn-outline-primary w-100"
                                        >
                                            Voir détails
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-info" role="alert">
                        Aucun produit trouvé. Veuillez modifier vos filtres.
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchPage;