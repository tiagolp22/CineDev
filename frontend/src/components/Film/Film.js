import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from '../App/App';
import Commentaires from '../Commentaires/Commentaires';
import StarRating from '../StarRating/StarRating';
import "./Film.css";
import Animations from '../Animations/Animations';
import Carrossel from '../Carrossel/Carrossel';
import Loader from '../Loader/Loader';

export function Film(props) {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [filmsAvecGenresSimilaires, setfilmsAvecGenresSimilaires] = useState([]);
  const context = useContext(AppContext);
  const urlFilm = `https://api-film-1.onrender.com/films/${id}`;
  const urltoutFilms = "https://api-film-1.onrender.com/films";

  useEffect(() => {
    fetch(urlFilm)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((filmData) => {
        if (typeof filmData.genres === 'string') {
          filmData.genres = JSON.parse(filmData.genres);
        }
        const filmGenres = filmData.genres || [];
        setFilm(filmData);
        fetch(urltoutFilms)
          .then((response) => response.json())
          .then((filmes) => {
            const filmFiltre = filmes.filter((f) => f.id !== id && Array.isArray(f.genres) && f.genres.some((g) => filmGenres.includes(g)));
            setfilmsAvecGenresSimilaires(filmFiltre);
          })
          .catch((error) => {
            console.error("Erreur lors de la recherche de films :", error);
          });
      })
      .catch((error) => {
        console.error("Erreur de fetch :", error);
      });
  }, [urlFilm, id, urltoutFilms]);


  if (!film) {
    return <Loader />;
  }

  const soumettreNote = async (note) => {
    if (!context.isLogged) {
      return;
    }
  
    const updatedNotes = film.notes ? [...film.notes, note] : [note];
  
    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: updatedNotes }),
    };
  
    try {
      await fetch(urlFilm, oOptions);
      const response = await fetch(urlFilm);
      const data = await response.json();
      setFilm((prevData) => ({ ...prevData, notes: data.notes }));
    } catch (error) {
      console.error("Erreur lors de la mise à jour des notes :", error);
    }
  };
  
  
  const soumettreCommentaire = async (e) => {
    e.preventDefault();
    const aCommentaires = JSON.parse(localStorage.getItem(`commentaires_${id}`)) || [];
    aCommentaires.push({ 
      commentaire: e.target.commentaire.value, 
      auteur: context.email, 
      date: new Date().toISOString() 
    });
  
    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentaire: aCommentaires }),
    };
  
    try {
      await fetch(urlFilm, oOptions);
      const response = await fetch(urlFilm);
      const data = await response.json();
      setFilm((prevData) => ({ ...prevData, commentaire: data.commentaire }));
      localStorage.setItem(`commentaires_${id}`, JSON.stringify(aCommentaires));
    } catch (error) {
      console.error("Erreur lors de la mise à jour des commentaires :", error);
    }
  };
  
  

  let blockAjoutCommentaire;

  if (context.isLogged) {
    blockAjoutCommentaire = (
      <form onSubmit={soumettreCommentaire} className="comment-form">
        <textarea name="commentaire" placeholder="Ajouter votre commentaire" className="comment-textarea" />
        <button className="comment-button">Soumettre</button>
      </form>
    );
  }

  const moyenneNotes = film.notes && film.notes.length
    ? film.notes.reduce((sum, note) => sum + note, 0) / film.notes.length
    : 0;

    return (
      <div className="film">
        <div className="film-header">
          <Animations animationVariants="goucheVersDroit">
            <img src={`/img/${film.titreVignette}`} alt={film.titre} className="film-image" />
            <StarRating rating={moyenneNotes} onRate={soumettreNote} />
          </Animations>
          <Animations animationVariants="basVersHaut">
            <div className="film-details">
              <h1>{film.titre}</h1>
              <p>Réalisateur : {film.realisation}</p>
              <p>Année : {film.annee}</p>
              <p>Description : {film.description}</p>
              <p>
                {film.genres.length > 1 ? 'Genres : ' : 'Genre : '}
                {film.genres.map((genre, index) => (
                  <span key={genre}>
                    {genre}
                    {index !== film.genres.length - 1 && ', '}
                  </span>
                ))}
              </p>
              {blockAjoutCommentaire}
            </div>
          </Animations>
        </div>
        <Commentaires commentaires={film.commentaire} />
        <Animations animationVariants="goucheVersDroit">
          <Carrossel films={filmsAvecGenresSimilaires} />
        </Animations>
      </div>
    );
}

export default Film;
