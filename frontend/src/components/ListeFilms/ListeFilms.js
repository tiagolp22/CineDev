import React, { useState, useEffect } from "react";
import "./ListeFilms.css";
import Animations from "../Animations/Animations";
import Filtres from "../Filtres/Filtres";
import TuilesFilm from "../TuileFilm/TuileFilm";
import Loader from "../Loader/Loader";

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

  return (
    <main>
      <Animations animationVariants="goucheVersDroit">
        <Filtres filtre={filtre} urlListeFilm={urlListeFilm} />
      </Animations>
      <Animations animationVariants="basVersHaut">
        {estCharge ? (
          <TuilesFilm className="grid-film wrapper" films={listeFilms} />
        ) : (<Loader />)}
      </Animations>
    </main>
  );
}

export default ListeFilms;
