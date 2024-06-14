import React from 'react';
import "./Commentaires.css";

function Commentaires({ commentaires }) {
  if (!Array.isArray(commentaires) || commentaires.length === 0) {
    return <p className="no-comments">Aucun commentaire enregistré</p>;
  }

  const commentairesInverses = [...commentaires].reverse();

  return (
    <div className="commentaires">
      {commentairesInverses.map((comm, index) => (
        <div key={index} className="comment">
          <div className="comment-header">
            <p className="comment-author"><strong>{comm.nom}</strong></p>
            <p className="comment-date">{new Date(comm.date).toLocaleString()}</p>
          </div>
          <p className="comment-text">{comm.commentaire}</p>
        </div>
      ))}
    </div>
  );
}

export default Commentaires;
