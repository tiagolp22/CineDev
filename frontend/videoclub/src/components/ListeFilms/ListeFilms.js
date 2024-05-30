import React, { useState, useEffect } from "react";
import "./ListeFilms.css";
import Animations from "../Animations/Animations";
import Filtres from "../Filtres/Filtres";
import TuilesFilm from "../TuileFilm/TuileFilm";

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
        ) : (
          <div className="container">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="col-sm-6 col-md-3">
                <div className="movie--isloading">
                  <div className="loading-image"></div>
                  <div className="loading-content">
                    <div className="loading-text-container">
                      <div className="loading-main-text"></div>
                      <div className="loading-sub-text"></div>
                    </div>
                    <div className="loading-btn"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Animations>
    </main>
  );
}

export default ListeFilms;
