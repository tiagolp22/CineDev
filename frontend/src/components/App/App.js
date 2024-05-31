import React, { useEffect } from "react";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import { jwtDecode } from "jwt-decode";
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

  let appState = "DEV";// PROD
  
  let apiBaseURL = "https://api-film-1.onrender.com/";

  if(appState === "DEV"){
    apiBaseURL = "http://localhost:5501/";
  }

  const location = useLocation();

  const [usager, setUsager] = useState({ isLogged: false, usager: {} });

  useEffect(()=>{
    const estValide = jetonValide();
    
    const userData={
      isLogged: estValide,
      usager: {},
    }

    setUsager(userData);
  }, [])

  // const [estLog, setEstLog] = useState(false);

  async function login(e) {
    e.preventDefault();
    const form = e.target;

    const body = {
      courriel: form.courriel.value,
      mdp:form.mdp.value,
    }

    const data = {
      method: "POST",
      headers: {
        "Content-Type":"application/json"
      },
      body:JSON.stringify(body)
    }

    const reponse = await fetch(`${apiBaseURL}api/utilisateurs/connexion`, data);
    const token = await reponse.json();

    if (reponse.status === 200) {
      localStorage.setItem("api-token", token);
      const userData={
        isLogged: true,
        usager: {},
      }
  
      setUsager(userData);
    } else {
      localStorage.removeItem("api-token", token);
    }
  }

  function jetonValide(){
    try {const token = localStorage.getItem("api-token");
    const decode = jwtDecode(token);

    if(token && Date.now()<decode.exp * 1000){
      return true;
    }else{
      localStorage.removeItem("api-token");
      return false;
    }
      
    } catch (error) {
      localStorage.removeItem("api-token");
      return false;
    }
  }

  function logout() {
    setUsager({ isLogged: false });
    localStorage.removeItem("api-token");
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
              element={usager.isLogged ? <Admin /> : <Navigate to="/" />}
            />
          </Routes>
        </AnimatePresence>
      {/* </Router> */}
    </AppContext.Provider>
  );
}

export default App;
