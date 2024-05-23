import React, { useState } from "react";

function Filtre({ filtre, urlListeFilm }) {
  const [filtreActive, setFiltreActive] = useState(null);

  const activerFiltre = (orderBy, orderDirection) => {
    filtre(`${urlListeFilm}?orderBy=${orderBy}&orderDirection=${orderDirection}`);
    setFiltreActive(orderBy);
  };

  return (
    <ul>
      <li onClick={() => activerFiltre("titre", "asc")}>
        Titre alphabétique (A-Z)
      </li>
      <li onClick={() => activerFiltre("titre", "desc")}>
        Titre alphabétique (Z-A)
      </li>
      <li onClick={() => activerFiltre("realisation", "asc")}>
        Réalisateur alphabétique (A-Z)
      </li>
      <li onClick={() => activerFiltre("realisation", "desc")}>
        Réalisateur alphabétique (Z-A)
      </li>
      <li onClick={() => activerFiltre("annee", "desc")}>
        Par année (du plus récent)
      </li>
      <li onClick={() => activerFiltre("annee", "asc")}>
        Par année (du plus ancien)
      </li>
    </ul>
  );
}

export default Filtre;

