import React from "react";
import { Link } from "react-router-dom";
import "./TuileFilm.css";

function TuilesFilm({ films, className, onDelete }) {
  return (
    <div className={`films-container ${className}`}>
      {films.map((film) => (
        <div key={film.id} className="film-card-container">
          <button
            className="delete-button"
            onClick={() => onDelete(film.id)}
          >
            Delete
          </button>
          <Link to={`/film/${film.id}`} className="film-card-link">
            <div className="film-card">
              <img src={`img/${film.titreVignette}`} alt={film.titre} />
              <div className="info-film">
                <h3>{film.titre}</h3>
                <p>Réalisateur: {film.realisation}</p>
                <p>Année: {film.annee}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default TuilesFilm;
