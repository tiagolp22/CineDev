import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./ListeFilms.css";
import TuilesFilm from "../TuileFilm/TuileFilm";
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
        ><div>
          <TuilesFilm className="grid-film wrapper" films={listeFilms} />
          </div>
        </motion.div>
      ) : (
        <div className="container">
          <div className="col-sm-6 col-md-3">
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
          <div className="col-sm-6 col-md-3">
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
          <div className="col-sm-6 col-md-3">
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
          <div className="col-sm-6 col-md-3">
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
        </div>
      )}
    </main>
  );
}

export default ListeFilms;
