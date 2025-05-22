import React from 'react';
import { Link } from 'react-router-dom';
import './FirstUse.css';

const FirstUse = () => {
  return (
    <div className="backfirstuse margin-top-global">
      <div className="container py-5">
        <h2 className="fw-bold mb-3 welcome-title">BIENVENIDO</h2>
        <hr className="animated-underline" />

        <div className="equal-height-row">
          {/* Imagen con animación slide left */}
          <div className="image-side animate-slide-left">
            <img
              src="/zgasito.jpg"
              alt="Ícono de bienvenida"
              className="full-height-img"
            />
          </div>

          {/* Texto con animación slide right */}
          <div className="text-first-container animate-slide-right">
            <div className="text-wrapper">
              <p className="info-firstuse">
                Somos una empresa comprometida con la distribución,
                comercialización y gestión eficiente del gas LP, 
                ofreciendo soluciones energéticas seguras, confiables 
                y accesibles para hogares, industrias y comercios.
              </p>
              <p className="info-firstuse">
                Nuestro enfoque se basa en la mejora continua de nuestros 
                procesos logísticos, atención personalizada y el uso de plataformas 
                digitales para facilitar el acceso al servicio.
              </p>
              <div className="button-wrapper">
                <Link to="/employee" className="btn-startfirstuse">
                  COMENZAR →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FirstUse;



