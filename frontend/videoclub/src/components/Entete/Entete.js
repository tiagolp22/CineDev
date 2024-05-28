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
            <img className="logo" src="/img/cineDev2.gif" alt="Logo"/>
          </NavLink>
          <nav>
            {context.estLog && <NavLink to='admin'>Admin</NavLink>}
            <NavLink to="films">Liste des films</NavLink>
          </nav>
        </div>

        {context.estLog ? (
          <div className="entete__user">
            <span>{context.nom}</span>
            <button onClick={props.handleLogout}>Logout</button>
          </div>
        ) : (
          <form className="entete__form" onSubmit={props.handleLogin}>
            <input type="text" name="usager" placeholder="Usager" />
            <button>Login</button>
          </form>
        )}
      </div>
    </header>
  );
}

export default Entete;
