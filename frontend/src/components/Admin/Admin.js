import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin(props) {
  const navigate = useNavigate();
  const [genres, setGenres] = useState([
    "Action",
    "Horreur",
    "Drame",
    "Science-fiction",
    "Aventure",
    "Mystère",
    "Thriller",
    "Crime",
  ]);
  const [choisiGenres, setchoisiGenres] = useState([]);
  const [nouveauGenre, setnouveauGenre] = useState("");
  const [titreVignetteFile, settitreVignetteFile] = useState(null);
  const [formValues, setFormValues] = useState({
    titre: "",
    description: "",
    realisation: "",
    annee: "",
  });

  async function onSubmit(e) {
    e.preventDefault();
  
    if (nouveauGenre && !choisiGenres.includes(nouveauGenre)) {
      setchoisiGenres([...choisiGenres, nouveauGenre]);
    }
  
    const formData = new FormData();
    formData.append("titre", formValues.titre);
    choisiGenres.forEach(genre => {
      formData.append("genres[]", genre);
    });
    formData.append("description", formValues.description);
    formData.append("realisation", formValues.realisation);
    formData.append("annee", formValues.annee);
    if (titreVignetteFile) {
      formData.append("titreVignetteFile", titreVignetteFile);
    }
  
    const token = `Bearer ${localStorage.getItem("api-token")}`;
    const options = {
      method: "POST",
      headers: {
        authorization: token,
      },
      body: formData,
    };
  
    try {
      const response = await fetch("http://localhost:5501/api/films", options);
      const json = await response.json();
      console.log(json);
  
      if (response.status === 200) {
        navigate("/films");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  function onChange(e) {
    const checkbox = e.currentTarget;
    const value = checkbox.value;
    if (checkbox.checked && !choisiGenres.includes(value)) {
      setchoisiGenres([...choisiGenres, value]);
    } else if (!checkbox.checked && choisiGenres.includes(value)) {
      setchoisiGenres(choisiGenres.filter((genre) => genre !== value));
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  return (
    <main>
      <div className="wrapper">
        <form className="form" onSubmit={onSubmit} encType="multipart/form-data">
          <h2>ADD FILM</h2>
          <div className="form__group">
            <label className="form__label" htmlFor="titre">Titre</label>
            <input
              className="form__input"
              type="text"
              name="titre"
              value={formValues.titre}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label">Genres</label>
            <div className="form__checkbox-group">
              {genres.map((genre, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    value={genre}
                    name="genres"
                    onChange={onChange}
                  />
                  <label>{genre}</label>
                </div>
              ))}
            </div>
            <div className="form__group">
              <input
                className="form__input"
                type="text"
                value={nouveauGenre}
                onChange={(e) => setnouveauGenre(e.target.value)}
                placeholder="Ajouter un genre"
              />
            </div>
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="description">Description</label>
            <textarea
              className="form__textarea"
              name="description"
              value={formValues.description}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="titreVignette">Titre Vignette</label>
            <input
              className="form__input"
              type="file"
              name="titreVignetteFile"
              onChange={(e) => settitreVignetteFile(e.target.files[0])}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="realisation">Réalisation</label>
            <input
              className="form__input"
              type="text"
              name="realisation"
              value={formValues.realisation}
              onChange={handleInputChange}
            />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="annee">Année</label>
            <input
              className="form__input"
              type="text"
              name="annee"
              value={formValues.annee}
              onChange={handleInputChange}
            />
          </div>
          <button className="form__button" type="submit">Ajouter Film</button>
        </form>
      </div>
    </main>
  );
}

export default Admin;
