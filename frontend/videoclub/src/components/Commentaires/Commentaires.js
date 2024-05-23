import React from 'react';
import "./Commentaires";

function Commentaires({ commentaires }) {
  if (!commentaires || commentaires.length === 0) {
    return <p>Aucun commentaire enregistré</p>;
  }

  return (
    <div>
      {commentaires.map((comm, index) => (
        <div key={index}>
          <p>{comm.commentaire}</p>
          <p><strong>{comm.auteur}</strong></p>
        </div>
      ))}
    </div>
  );
}

export default Commentaires;
