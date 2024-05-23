import React from 'react';
import './Accueil.css';
import accueilDonnees from './Accueil.json';

function Accueil() {
  return (
    <main className="accueil">
      <div className="accueil__hero">
        <img src='/img/mario.webp' alt="image film mario bros" className="accueil__image"/>
      </div>
      <div className="accueil__content">
        <p>
          {accueilDonnees}
        </p>
      </div>
    </main>
  );
}

export default Accueil;
