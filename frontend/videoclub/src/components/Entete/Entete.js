import { NavLink } from "react-router-dom";
import "./Entete.css";
import { AppContext } from "../App/App";
import { useContext } from "react";
//import { useRef } from "react";


function Entete(props) {

  //console.log(props);
  //const elUsager = useRef();
  const context = useContext(AppContext);

  // function login(e){
  //   e.preventDefault();
  //   console.log(elUsager.current.value);
  // }

  return (
    <header>
      <div className="wrapper">
        <div className="entete">
          <NavLink to="/">
            <h1>VidéoClub</h1>
          </NavLink>
          <nav>
            {context.estLog && <NavLink to='admin'>Admin</NavLink>}
            <NavLink to="films">Liste des films</NavLink>
          </nav>
        </div>

        {context.estLog ? (
          <div>
            <span>{context.nom}</span>
            <button onClick={props.handleLogout}>Logout</button>
          </div>
        ) : (
          <form onSubmit={props.handleLogin}>
            <input type="text" name="usager" placeholder="Usager"></input>
            <button>Login</button>
          </form>
        )}
      </div>
    </header>
  );
}

export default Entete;
