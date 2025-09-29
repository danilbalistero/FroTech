import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ titulo, valor, subtitulo, icone }) => {
  return (
    <div className="card-indicador">
      <div className="card-texto">
        <span className="valor">{valor}</span>
        <span className="titulo">{titulo}</span>
        {subtitulo && <span className="subtitulo">{subtitulo}</span>}
      </div>
      
      {icone && <div className="icone-card">{icone}</div>}
    </div>
  );
};

export default DashboardCard;