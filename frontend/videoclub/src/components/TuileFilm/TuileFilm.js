import React from 'react';
import "./TuileFilm.css";

function TuileFilm({ props }) {
  return (
    <article>
      <img src={`img/${props.titreVignette}`} alt={props.titre} />
      <h2>{props.titre}</h2>
      <p>Diretor: {props.realisateur}</p>
      <p>Ano: {props.annee}</p>
    </article>
  );
}

export default TuileFilm;
