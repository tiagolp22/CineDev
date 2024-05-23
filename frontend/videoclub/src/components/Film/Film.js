import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from '../App/App';
import Vote from '../Vote/Vote';
import Commentaires from '../Commentaires/Commentaires';

import "./Film.css";


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

  if (context.estLog) {
    blockAjoutCommentaire = (
      <form onSubmit={soumettreCommentaire}>
        <textarea name="commentaire" placeholder="Ajouter votre commentaire" />
        <button>Soumettre</button>
      </form>
    );
  }

  return (
    <div className="film">
      <h1>{film.titre}</h1>
      <img src={`/img/${film.titreVignette}`} alt={film.titre} />
      <p>Réalisateur: {film.realisateur}</p>
      <p>Année: {film.annee}</p>
      <p>Description: {film.description}</p>
      <Vote film={film} onVote={soumettreNote} />
      {blockAjoutCommentaire}
      <Commentaires commentaires={film.commentaire} />
    </div>
  );
}

export default Film;