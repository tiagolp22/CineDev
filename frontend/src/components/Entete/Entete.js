import { NavLink } from "react-router-dom";
import "./Entete.css";
import { AppContext } from "../App/App";
import { useContext } from "react";

function Entete(props) {
  const context = useContext(AppContext);

  return (
    <header>
      <div className="wrapper">
        <div className="entete">
          <NavLink to="/">
            <img className="logo" src="/img/cineDev2.gif" alt="Logo" />
          </NavLink>
          <nav>
            {<NavLink to='admin'>Admin</NavLink>}
          </nav>
        </div>

        {context.isLogged ? (
          <div className="entete__user">
            <span>{context.nom}</span>
            <button onClick={props.handleLogout}>Logout</button>
          </div>
        ) : (
          <form className="entete__form" onSubmit={props.handleLogin}>
            <input type="text" name="courriel" placeholder="Usager" />
            <input type="password" name="mdp" placeholder="Mot de passe" />
            <button>Login</button>
          </form>
        )}
      </div>
      <NavLink className={"liste-film"} to="films">Liste des films</NavLink>
    </header>
  );
}

export default Entete;
