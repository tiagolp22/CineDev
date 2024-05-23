import React from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Entete from "../Entete/Entete";
import Accueil from "../Accueil/Accueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import Film from "../Film/Film";
import { Navigate } from "react-router-dom";
import Admin from "../Admin/Admin";

export const AppContext = React.createContext();

function App() {
  const location = useLocation();

  const [usager, setUsager] = useState({ estLog: false, nom: "" });

  // const [estLog, setEstLog] = useState(false);

  function login(e) {
    e.preventDefault();
    //console.log('login');
    let usager = e.target.usager.value;

    if (usager === "admin") {
      setUsager((prevUsager) => ({ ...prevUsager, estLog: true, nom: usager }));
      e.target.reset();
    }
  }

  function logout() {
    setUsager({ estLog: false, nom: "" });
  }

  return (
    <AppContext.Provider value={usager}>

      {/* <Router> */}
        {/* <Entete handleLogin={login} /> */}
        <Entete handleLogin={login} handleLogout={logout} />
        <AnimatePresence mode='wait'>
          <Routes location={location} key={location.key}>
            <Route path="/" element={<Accueil />} />
            <Route path="/films" element={<ListeFilms />} />
            <Route path="/film/:id" element={<Film />} />

            <Route
              path="/admin"
              element={usager.estLog ? <Admin /> : <Navigate to="/" />}
            />
          </Routes>
        </AnimatePresence>
      {/* </Router> */}
    </AppContext.Provider>
  );
}

export default App;
