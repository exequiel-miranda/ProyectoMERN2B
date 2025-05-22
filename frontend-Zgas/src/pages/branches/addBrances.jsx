import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './addBranches.css'; // Usa el CSS para branches que creamos

const AddBranch = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const [form, setForm] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    city: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      id: '',
      name: '',
      address: '',
      phone: '',
      city: '',
      country: '',
    });
  };

  const handleSave = async () => {
    try {
      if (!form.name || !form.address) {
        alert("Por favor completa los campos requeridos: nombre y dirección.");
        return;
      }

      const response = await fetch('http://localhost:4000/api/branches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Error al guardar sucursal');
      }

      await response.json();
      alert('Sucursal guardada correctamente.');
      handleClear();
      navigate('/branches');

    } catch (error) {
      console.error(error);
      alert('Error guardando sucursal: ' + error.message);
    }
  };

  return (
    <>
      <div className="backbranches"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to={"/branches"} className="ap-btn-back">← VOLVER</Link>
      </div>
      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addemployee-title">AGREGAR NUEVA SUCURSAL</h2>
        <div className="ap-card rounded p-4 shadow">
          <form
            className="row g-3"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="col-6">
              <label className="form-label ap-label">ID</label>
              <input
                type="text"
                className="form-control ap-input"
                name="id"
                value={form.id}
                onChange={handleChange}
                placeholder="ID único"
              />
            </div>
            <div className="col-6">
              <label className="form-label ap-label">Nombre *</label>
              <input
                type="text"
                className="form-control ap-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ingrese el nombre"
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label ap-label">Dirección *</label>
              <input
                type="text"
                className="form-control ap-input"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Ingrese la dirección"
                required
              />
            </div>
            <div className="col-6">
              <label className="form-label ap-label">Teléfono</label>
              <input
                type="text"
                className="form-control ap-input"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Número telefónico"
              />
            </div>
            <div className="col-6">
              <label className="form-label ap-label">Ciudad</label>
              <input
                type="text"
                className="form-control ap-input"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Ciudad"
              />
            </div>
            <div className="col-6">
              <label className="form-label ap-label">País</label>
              <input
                type="text"
                className="form-control ap-input"
                name="country"
                value={form.country}
                onChange={handleChange}
                placeholder="País"
              />
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                type="button"
                className="btn ap-btn-clear"
                onClick={handleClear}
              >
                Limpiar formulario
              </button>
              <button
                type="submit"
                className="btn ap-btn-save"
              >
                Guardar sucursal
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddBranch;
