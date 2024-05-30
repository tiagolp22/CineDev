import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from '../App/App';
import Commentaires from '../Commentaires/Commentaires';
import StarRating from '../StarRating/StarRating';
import "./Film.css";
import Animations from '../Animations/Animations';

export function Film(props) {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const context = useContext(AppContext);
  const urlFilm = `https://api-film-1.onrender.com/films/${id}`;

  useEffect(() => {
    fetch(urlFilm)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (!data.commentaire) {
          data.commentaire = [];
        }
        console.log("Data retornada pelo fetch:", data);
        setFilm(data);
      })
      .catch((error) => {
        console.error("Erreur de fetch:", error);
      });
  }, [urlFilm, id]);

  if (!film) {
    return <div>Données non trouvées</div>;
  }

  const soumettreNote = async (note) => {
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
      console.error("Erreur de mise à jour des notes:", error);
    }
  };

  const soumettreCommentaire = async (e) => {
    e.preventDefault();
    let aCommentaires = film.commentaire || [];
    aCommentaires.push({ commentaire: e.target.commentaire.value, auteur: context.nom });

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
    } catch (error) {
      console.error("Erreur de mise à jour des commentaires:", error);
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
    ? film.notes.reduce((acc, note) => acc + note, 0) / film.notes.length
    : 0;

    return (
      <div className="film">
        <div className="film-header">
          <Animations animationVariants="goucheVersDroit">
            <img src={`/img/${film.titreVignette}`} alt={film.titre} className="film-image" />
          </Animations>
          <Animations animationVariants="basVersHaut">
            <div className="film-details">
              <h1>{film.titre}</h1>
              <p>Réalisateur: {film.realisation}</p>
              <p>Année: {film.annee}</p>
              <p>Description: {film.description}</p>
              <StarRating rating={moyenneNotes} onRate={soumettreNote} />
              {blockAjoutCommentaire}
            </div>
          </Animations>
        </div>
        <Commentaires commentaires={film.commentaire} />
      </div>
    );
}

export default Film;
