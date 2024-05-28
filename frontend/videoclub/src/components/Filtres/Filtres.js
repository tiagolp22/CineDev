import React, { useState } from "react";
import "./Filtres.css";

function Filtre({ filtre, urlListeFilm }) {
  console.log(filtre);
  const [filtreActive, setFiltreActive] = useState(null);

  const activerFiltre = (orderBy, orderDirection) => {
    filtre(`${urlListeFilm}?orderBy=${orderBy}&orderDirection=${orderDirection}`);
    setFiltreActive(orderBy);
  };

  return (
    <ul className="filtre">
      <li
        className={filtreActive === "titre" && "active"}
        onClick={() => activerFiltre("titre", "asc")}
      >
        Titre alphabétique (A-Z)
      </li>
      <li
        className={filtreActive === "titre" && "active"}
        onClick={() => activerFiltre("titre", "desc")}
      >
        Titre alphabétique (Z-A)
      </li>
      <li
        className={filtreActive === "realisation" && "active"}
        onClick={() => activerFiltre("realisation", "asc")}
      >
        Réalisateur alphabétique (A-Z)
      </li>
      <li
        className={filtreActive === "realisation" && "active"}
        onClick={() => activerFiltre("realisation", "desc")}
      >
        Réalisateur alphabétique (Z-A)
      </li>
      <li
        className={filtreActive === "annee" && "active"}
        onClick={() => activerFiltre("annee", "desc")}
      >
        Par année (du plus récent)
      </li>
      <li
        className={filtreActive === "annee" && "active"}
        onClick={() => activerFiltre("annee", "asc")}
      >
        Par année (du plus ancien)
      </li>
    </ul>
  );
}

export default Filtre;
