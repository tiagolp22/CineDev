import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Erreur404.css';
import Animations from '../Animations/Animations';

const Erreur404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const torch = document.querySelector('.torch');
      if (torch) {
        torch.style.top = event.pageY + 'px';
        torch.style.left = event.pageX + 'px';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleClick = () => {
    navigate('/');
  };

  return (
    <Animations animationVariants="basVersHaut">
      <div className="erreur404-container" onClick={handleClick}>
        <div className="text wrapper">
          <h1>404</h1>
          <h2>Uh, Ohh</h2>
          <h3>Désolé, nous ne pouvons pas trouver ce que vous cherchez parce qu'il fait si sombre ici,
            mais cliquez ici, et je vous ramènerai en toute sécurité.
          </h3>
        </div>
        <div className="torch"></div>
        </div>
    </Animations>
  );
}

export default Erreur404;
