import React, { useEffect, useState, createContext } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Entete from "../Entete/Entete";
import Accueil from "../Accueil/Accueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import Film from "../Film/Film";
import { Navigate } from "react-router-dom";
import Admin from "../Admin/Admin";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Erreur404 from "../Erreur404/Erreur404";
import { jwtDecode } from "jwt-decode";

export const AppContext = createContext();

function App() {
  let appState = "PROD"; // PROD
  let apiBaseURL = "https://cinedev.onrender.com/";

  if (appState === "DEV") {
    apiBaseURL = "http://localhost:5501/";
  }

  const location = useLocation();

  const [usager, setUsager] = useState({ isLogged: false, nom: "" });

  useEffect(() => {
    const estValide = jetonValide();
    if (estValide) {
      const token = localStorage.getItem("api-token");
      const decoded = jwtDecode(token);
      const userData = {
        isLogged: true,
        nom: decoded.nom,
      };
      setUsager(userData);
    }
  }, []);

  async function login(e) {
    e.preventDefault();
    const form = e.target;

    const body = {
      courriel: form.courriel.value,
      mdp: form.mdp.value,
    };

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const reponse = await fetch(`${apiBaseURL}api/utilisateurs/connexion`, data);
    const token = await reponse.json();

    if (reponse.status === 200) {
      localStorage.setItem("api-token", token);
      const decoded = jwtDecode(token);
      const userData = {
        isLogged: true,
        nom: decoded.nom,
      };
      setUsager(userData);
    } else {
      localStorage.removeItem("api-token");
    }
  }

  function jetonValide() {
    try {
      const token = localStorage.getItem("api-token");
      const decode = jwtDecode(token);

      if (token && Date.now() < decode.exp * 1000) {
        return true;
      } else {
        localStorage.removeItem("api-token");
        return false;
      }
    } catch (error) {
      localStorage.removeItem("api-token");
      return false;
    }
  }

  function logout() {
    setUsager({ isLogged: false, nom: "" });
    localStorage.removeItem("api-token");
  }

  return (
    <AppContext.Provider value={usager}>
      <Entete handleLogin={login} handleLogout={logout} />
      <AnimatePresence mode='wait'>
        <Routes location={location} key={location.key}>
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin apiBaseURL={apiBaseURL} />} />
          </Route>
          <Route path="/" element={<Accueil />} />
          <Route path="/films" element={<ListeFilms />} />
          <Route path="/film/:id" element={<Film />} />
          <Route path="*" element={<Erreur404 />} />
        </Routes>
      </AnimatePresence>
    </AppContext.Provider>
  );
}

export default App;
