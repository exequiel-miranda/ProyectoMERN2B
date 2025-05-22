import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './Products.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardProduct from '../../components/cardProducts/CardProducts.jsx';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:4000/api/products');
      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }
      const data = await response.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Error al cargar productos. Por favor, intenta más tarde.');
      console.error('Fetch products error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: true });
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este producto?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:4000/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter(prod => prod._id !== id));
      } else {
        alert('No se pudo eliminar el producto.');
      }
    } catch (err) {
      alert('Error al eliminar el producto.');
      console.error('Delete product error:', err);
    }
  };

  return (
    <>
      <div className="backproducts" />
      <div className="fixed-container">
        <div className="content-wrapper">
          <div className="header">
            <h1>TODOS LOS PRODUCTOS</h1>
            <Link to="/addProducts" className="btn btn-addproducts">+ Agregar Producto</Link>
          </div>

          {loading ? (
            <div className="text-center">Cargando productos...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : products.length === 0 ? (
            <div className="alert alert-warning">No se encontraron productos.</div>
          ) : (
            <div className="cards-grid">
              {products.map(prod => (
                <div key={prod._id} className="card-wrapper" data-aos="fade-up">
                  <div className="card">
                    <CardProduct {...prod} />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleDelete(prod._id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Products;
