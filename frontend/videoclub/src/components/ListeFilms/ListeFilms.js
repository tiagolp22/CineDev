import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ListeFilms.css";
import TuileFilm from "../TuileFilm/TuileFilm";
import Filtres from "../Filtres/Filtres";

function ListeFilms() {
  const urlListeFilm = "https://api-film-1.onrender.com/films";
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilm);
  const [listeFilms, setListeFilms] = useState([]);

  const [estCharge, setEstCharger] = useState(false);

  useEffect(() => {
    fetch(urlFiltre)
      .then((response) => response.json())
      .then((data) => {
        setListeFilms(data);
        setEstCharger(true);
      });
  }, [urlFiltre]);

  const filtre = (filterUrl) => {
    setUrlFiltre(filterUrl);
  };

  const tuilesFilm = (
    <div className="films-container">
      {listeFilms.map((film) => (
        <Link key={film.id} to={`/film/${film.id}`} className="film-card-link">
          <div className="film-card">
            <img src={`img/${film.titreVignette}`} alt={film.titre} />
            <h3>{film.titre}</h3>
            <p>Réalisateur: {film.realisateur}</p>
            <p>Année: {film.annee}</p>
          </div>
        </Link>
      ))}
    </div>
  );

  const transition = { duration: 1.5, ease: "easeInOut" };

  const animationBasVersHaut = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: 25, transition },
  };

  const animationGoucheVersDroit = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0, transition },
    exit: { opacity: 0, x: -25, transition },
  };

  
  return (
    <main>
      <section className="hero-banner">
        <h1>Catalogue des Films</h1>
      </section>
      <motion.div
        key="filtres"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={animationGoucheVersDroit}
      >
        <Filtres filtre={filtre} urlListeFilm={urlListeFilm} />
      </motion.div>
      {estCharge ? (
        <motion.div
          key="liste-film"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationBasVersHaut}
        >
          {tuilesFilm}
        </motion.div>
      ) : (
        <p>Chargement...</p>
      )}
    </main>
  );
}

export default ListeFilms;
