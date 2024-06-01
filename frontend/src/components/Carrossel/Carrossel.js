import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./Carrossel.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 300 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 300, min: 0 },
    items: 1,
  },
};

function Carrossel({ films }) {
  return (
    <div className="carrossel-container">
      <Carousel
        responsive={responsive}
        infinite
        autoPlay
        autoPlaySpeed={6000}
        keyBoardControl
        showDots
        arrows
      >
        {films.map((film) => (
          <div key={film.id} className="carrossel-item">
            <img
              src={`/img/${film.titreVignette}`}
              alt={film.titre}
              className="carrossel-image"
            />
            <p className="carrossel-title">{film.titre}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

export default Carrossel;
