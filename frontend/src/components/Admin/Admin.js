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

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;

    if (nouveauGenre && !choisiGenres.includes(nouveauGenre)) {
      choisiGenres.push(nouveauGenre);
    }

    const data = {
      titre: form.titre.value,
      genres: choisiGenres,
      description: form.description.value,
      titreVignette: form.titreVignette.value,
      realisation: form.realisation.value,
      annee: form.annee.value,
    };

    const token = `Bearer ${localStorage.getItem("api-token")}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch("http://localhost:5501/api/films", options);
      const json = await response.json();
      console.log(json);

      if (response.status === 200) {
        navigate("/films");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário", error);
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

  return (
    <main>
      <div className="wrapper">
        <form className="form" onSubmit={onSubmit}>
          <div className="form__group">
            <label className="form__label" htmlFor="titre">Titre</label>
            <input className="form__input" type="text" name="titre" />
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
            <textarea className="form__textarea" name="description"></textarea>
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="titreVignette">Titre Vignette</label>
            <input className="form__input" type="text" name="titreVignette" />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="realisation">Réalisation</label>
            <input className="form__input" type="text" name="realisation" />
          </div>
          <div className="form__group">
            <label className="form__label" htmlFor="annee">Année</label>
            <input className="form__input" type="text" name="annee" />
          </div>
          <button className="form__button" type="submit">Ajouter Film</button>
        </form>
      </div>
    </main>
  );
}

export default Admin;
