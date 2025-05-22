import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardEmployee.css';

function CardEmployee({
  _id,
  name,
  lastName,
  birthday,
  email,
  telephone,
  dui,
  issNumber,
  hireDate,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/editemployee', {  // ruta en español
      state: {
        _id,
        name,
        lastName,
        birthday,
        email,
        telephone,
        dui,
        issNumber,
        hireDate,
      },
    });
  };

  return (
    <div className="card-employee shadow" data-aos="zoom-in">
      <div className="employee-header">
        <h4>{name} {lastName}</h4>
        <span className="employee-subtitle">Perfil del Empleado</span>
      </div>

      <div className="employee-info">
        <p><strong>📧 Correo electrónico:</strong> {email}</p>
        <p><strong>📞 Teléfono:</strong> {telephone}</p>
        <p><strong>🪪 DUI:</strong> {dui}</p>
        <p><strong>🩺 Número ISS:</strong> {issNumber}</p>
        <p><strong>🎂 Fecha de nacimiento:</strong> {new Date(birthday).toLocaleDateString()}</p>
        <p><strong>📅 Fecha de contratación:</strong> {new Date(hireDate).toLocaleDateString()}</p>
      </div>

      <button className="btn btn-editemployee" onClick={handleEdit}>
        ✏️ Editar Empleado
      </button>
    </div>
  );
}

export default CardEmployee;

