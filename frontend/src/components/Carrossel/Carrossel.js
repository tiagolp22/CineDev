import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-responsive-carousel/lib/styles/carousel.css";
import "./Carrossel.css";

function Carrossel({ films }) {
  return (
    <div className="carrossel-container">
      <Carousel>
        {films.map((film) => (
          <div key={film.id} className="carrossel-item">
            <img
              src={`/img/${film.titreVignette}`}
              alt={film.titre}
              className="carrossel-image"
            />
            <p>{film.titre}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carrossel;
