import './Accueil.css';
import accueilDonnees from './Accueil.json'
import Mario from "../img/mario.webp"

function Accueil() {
  
  return (
    <main>
      <img className="img-accueil" src={Mario}/>
      <div>
      {accueilDonnees.map((p, index) => (
        <p key={index}>{p}</p>
      ))}
      </div>
    </main>
)

}

export default Accueil;