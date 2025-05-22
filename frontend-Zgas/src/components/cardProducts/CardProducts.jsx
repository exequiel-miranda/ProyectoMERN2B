import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardProducts.css';

function CardProduct({ _id, name, description, price, stock }) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate('/editProducts', {
      state: { _id, name, description, price, stock },
    });
  };

  return (
    <div className="card-product shadow" data-aos="zoom-in">
      <div className="product-header">
        <h4>{name}</h4>
        <span className="product-subtitle">Descripción del Producto</span>
      </div>

      <div className="product-info">
        <p><strong>Descripción:</strong> {description}</p>
        <p><strong>Precio:</strong> ${price.toFixed(2)}</p>
        <p><strong>Stock:</strong> {stock}</p>
      </div>

      <button className="btn btn-editproduct" onClick={handleEdit}>
        ✏️ Editar Producto
      </button>
    </div>
  );
}

export default CardProduct;

