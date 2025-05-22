import React, { useEffect, useState } from 'react';
import './addEmployees.css';  
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const AddEmployee = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const [form, setForm] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    age: '',
    gender: '',
    rol: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      id: '',
      name: '',
      email: '',
      phone: '',
      age: '',
      gender: '',
      rol: '',
    });
  };

  const handleSave = async () => {
    try {
      if (!form.name || !form.email) {
        alert("Por favor completa los campos requeridos: nombre y correo electrónico.");
        return;
      }

      const response = await fetch('http://localhost:4000/api/employee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Error al guardar empleado');
      }

      await response.json();
      alert('Empleado guardado correctamente.');
      handleClear();
      navigate('/employee');

    } catch (error) {
      console.error(error);
      alert('Error guardando empleado: ' + error.message);
    }
  };

  return (
    <>
      <div className="backaddemployee"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to={"/employee"} className="ap-btn-back">← VOLVER</Link>
      </div>
      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addemployee-title">AGREGAR NUEVO EMPLEADO</h2>
        <div className="ap-card rounded p-4 shadow">
          <div className="row g-4">
            <div className="col-md-12">
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
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Correo electrónico *</label>
                  <input
                    type="email"
                    className="form-control ap-input"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
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
                  <label className="form-label ap-label">Edad</label>
                  <input
                    type="number"
                    className="form-control ap-input"
                    name="age"
                    value={form.age}
                    onChange={handleChange}
                    placeholder="Edad"
                  />
                </div>
                <div className="col-6">
                  <label className="form-label ap-label">Género</label>
                  <select
                    className="form-select ap-input"
                    name="gender"
                    value={form.gender}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="female">Femenino</option>
                    <option value="male">Masculino</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label ap-label">Rol</label>
                  <select
                    className="form-select ap-input"
                    name="rol"
                    value={form.rol}
                    onChange={handleChange}
                  >
                    <option value="">Seleccionar</option>
                    <option value="admin">Administrador</option>
                    <option value="manager">Gerente</option>
                    <option value="employee">Empleado</option>
                  </select>
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
                    Guardar empleado
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddEmployee;






