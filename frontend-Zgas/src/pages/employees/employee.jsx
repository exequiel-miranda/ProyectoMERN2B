import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Employees.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import CardEmployee from '../../components/cardemployee/Cardemployee.jsx';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-out', once: true });
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://proyectomern2b-qwwg.onrender.com/api/employee');
      if (!response.ok) throw new Error(`Error HTTP! estado: ${response.status}`);
      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch {
      setError('Error al cargar empleados. Por favor, intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('¿Estás seguro de que quieres eliminar este empleado?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://proyectomern2b-qwwg.onrender.com/api/employee/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees(employees.filter(emp => emp._id !== id));
      } else {
        alert('No se pudo eliminar el empleado.');
      }
    } catch {
      alert('Error al eliminar el empleado.');
    }
  };

  return (
    <>
      <div className="backemployees" />
      <div className="fixed-container">
        <div className="content-wrapper">
          <div className="header">
            <h1>TODOS LOS EMPLEADOS</h1>
            <Link to="/addemployee" className="btn btn-addemployees">+ Agregar Empleado</Link>
          </div>

          {loading ? (
            <div className="text-center">Cargando empleados...</div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : employees.length === 0 ? (
            <div className="alert alert-warning">No se encontraron empleados.</div>
          ) : (
            <div className="cards-grid">
              {employees.map(emp => (
                <div key={emp._id} className="card-wrapper" data-aos="fade-up">
                  <div className="card">
                    <CardEmployee {...emp} />
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(emp._id)}
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

export default Employees;



