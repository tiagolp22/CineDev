import React, { useState, useEffect } from 'react';
import "./vote.css";

function Vote({ film, onVote }) {
  const [average, setAverage] = useState(null);
  const [numVotes, setNumVotes] = useState(0);

  useEffect(() => {
    if (film.notes && film.notes.length > 0) {
      const total = film.notes.reduce((acc, note) => acc + note, 0);
      setAverage((total / film.notes.length).toFixed(2));
      setNumVotes(film.notes.length);
    } else {
      setAverage(null);
      setNumVotes(0);
    }
  }, [film]);

  const handleVote = (note) => {
    onVote(note);
  };

  return (
    <div className="vote">
      <div className="vote-buttons">
        {[1, 2, 3, 4, 5].map((note) => (
          <button key={note} onClick={() => handleVote(note)}>
            {note}
          </button>
        ))}
      </div>
      {numVotes > 0 ? (
        <p>Moyenne: {average} ({numVotes} {numVotes > 1 ? 'votes' : 'vote'})</p>
      ) : (
        <p>Aucun vote enregistré</p>
      )}
    </div>
  );
}

export default Vote;
