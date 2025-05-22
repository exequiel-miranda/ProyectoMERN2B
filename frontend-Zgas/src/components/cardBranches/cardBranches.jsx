import React from "react";
import { useNavigate } from "react-router-dom";
import "./cardBranches.css";

function CardBranch({
  _id,
  name,
  lastName,
  birthday,
  email,
  telephone,
  dui,
  password,
}) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate("/editBranches", {
      state: {
        _id,
        name,
        lastName,
        birthday,
        email,
        telephone,
        dui,
        password,
      },
    });
  };

  return (
    <div className="card-branch shadow" data-aos="zoom-in">
      <div className="branch-header">
        <h4>{name} {lastName}</h4>
        <span className="branch-subtitle">Perfil de la Sucursal</span>
      </div>

      <div className="branch-info">
        <p><strong>📧 Correo electrónico:</strong> {email}</p>
        <p><strong>📞 Teléfono:</strong> {telephone}</p>
        <p><strong>🪪 DUI:</strong> {dui}</p>
        <p><strong>🔑 Contraseña:</strong> {password}</p>
        <p><strong>🎂 Fecha de nacimiento:</strong> {new Date(birthday).toLocaleDateString()}</p>
      </div>

      <button className="btn btn-editbranch" onClick={handleEdit}>
        ✏️ Editar Sucursal
      </button>
    </div>
  );
}

export default CardBranch;
