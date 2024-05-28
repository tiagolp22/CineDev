import React from 'react';
import "./Commentaires.css"; // Certifique-se de que o caminho está correto

function Commentaires({ commentaires }) {
  if (!commentaires || commentaires.length === 0) {
    return <p className="no-comments">Aucun commentaire enregistré</p>;
  }

  return (
    <div className="commentaires">
      {commentaires.map((comm, index) => (
        <div key={index} className="comment">
          <p className="comment-text">{comm.commentaire}</p>
          <p className="comment-author"><strong>{comm.auteur}</strong></p>
        </div>
      ))}
    </div>
  );
}

export default Commentaires;
