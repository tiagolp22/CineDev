import React, { useState } from "react";
import "./Filtres.css";

function Filtre({ filtre, urlListeFilm }) {
  const [filtreActif, setFiltreActif] = useState("");

  const activerFiltre = (orderBy, orderDirection) => {
    const filtreString = `${orderBy}-${orderDirection}`;
    filtre(`${urlListeFilm}?orderBy=${orderBy}&orderDirection=${orderDirection}`);
    setFiltreActif(filtreString);
  };

  const filtres = [
    { label: "Trier par titre (A-Z)", orderBy: "titre", orderDirection: "asc" },
    { label: "Trier par titre (Z-A)", orderBy: "titre", orderDirection: "desc" },
    { label: "Trier par réalisateur (A-Z)", orderBy: "realisation", orderDirection: "asc" },
    { label: "Trier par réalisateur (Z-A)", orderBy: "realisation", orderDirection: "desc" },
    { label: "Par année (du plus récent)", orderBy: "annee", orderDirection: "desc" },
    { label: "Par année (du plus ancien)", orderBy: "annee", orderDirection: "asc" },
  ];

  return (
    <ul className="filtre">
      {filtres.map(({ label, orderBy, orderDirection }) => (
        <li
          key={`${orderBy}-${orderDirection}`}
          className={filtreActif === `${orderBy}-${orderDirection}` ? "active" : ""}
          onClick={() => activerFiltre(orderBy, orderDirection)}
        >
          {label}
        </li>
      ))}
    </ul>
  );
}

export default Filtre;
