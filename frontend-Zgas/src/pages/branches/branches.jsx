import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Branches.css'; // Usa el CSS que creamos para branches
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardBranch from '../../components/cardBranches/CardBranches.jsx'; // Asumiendo que tienes el CardBranch creado

const Branches = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: true });
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:4000/api/branches');
      if (!response.ok) throw new Error(`Error HTTP! estado: ${response.status}`);
      const data = await response.json();
      setBranches(Array.isArray(data) ? data : []);
    } catch {
      setError('Error al cargar sucursales. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar esta sucursal?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:4000/api/branches/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBranches(branches.filter(branch => branch._id !== id));
      } else {
        alert('No se pudo eliminar la sucursal.');
      }
    } catch {
      alert('Error al eliminar la sucursal.');
    }
  };

  return (
    <>
      <div className="backbranches" />
      <div className="fixed-container">
        <div className="content-wrapper">
          <div className="header">
            <h1>TODAS LAS SUCURSALES</h1>
            <Link to="/addbranches" className="btn btn-addbranches">+ Agregar Sucursal</Link>
          </div>

          {loading ? (
            <div className="text-center">Cargando sucursales...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : branches.length === 0 ? (
            <div className="alert alert-warning">No se encontraron sucursales.</div>
          ) : (
            <div className="cards-grid">
              {branches.map(branch => (
                <div key={branch._id} className="card-wrapper" data-aos="fade-up">
                  <div className="card">
                    <CardBranch {...branch} />
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(branch._id)}
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

export default Branches;
