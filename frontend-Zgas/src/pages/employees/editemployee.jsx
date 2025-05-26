import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './editEmployee.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EditEmployee = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    name: '',
    lastName: '',
    birthday: '',
    hireDate: '',
    email: '',
    password: '',
    telephone: '',
    dui: '',
    issNumber: '',
    gender: '',
    rol: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  useEffect(() => {
    if (!location.state) {
      alert('¡No se encontraron datos del empleado para editar!');
      navigate('/employee');
      return;
    }
    const { _id, ...rest } = location.state;
    setForm({ id: _id, ...rest });
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      id: form.id,
      name: '',
      lastName: '',
      birthday: '',
      hireDate: '',
      email: '',
      password: '',
      telephone: '',
      dui: '',
      issNumber: '',
      gender: '',
      rol: ''
    });
  };

  const handleSave = async () => {
    // Validaciones para campos obligatorios
    const requiredFields = [
      { name: 'name', label: 'Nombre' },
      { name: 'lastName', label: 'Apellido' },
      { name: 'birthday', label: 'Fecha de Nacimiento' },
      { name: 'hireDate', label: 'Fecha de Contratación' },
      { name: 'email', label: 'Correo Electrónico' },
      { name: 'password', label: 'Contraseña' },
      { name: 'telephone', label: 'Teléfono' },
      { name: 'dui', label: 'DUI' },
      { name: 'issNumber', label: 'Número ISS' },
      { name: 'gender', label: 'Género' },
      { name: 'rol', label: 'Rol' },
    ];

    const errors = [];

    requiredFields.forEach(field => {
      if (!form[field.name] || form[field.name].toString().trim() === '') {
        errors.push(`El campo ${field.label} es obligatorio.`);
      }
    });

    // Validación simple de email
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      errors.push('El correo electrónico debe ser válido.');
    }

    // Validación básica de teléfono (solo números, 8-15 dígitos)
    if (form.telephone && !/^\d{8,15}$/.test(form.telephone)) {
      errors.push('El teléfono debe tener entre 8 y 15 dígitos.');
    }

    // Validación básica de DUI (ejemplo: 8 dígitos, guion, 1 dígito)
    if (form.dui && !/^\d{8}-\d{1}$/.test(form.dui)) {
      errors.push('El formato del DUI es inválido. Formato esperado: 12345678-9');
    }

    if (errors.length > 0) {
      alert('Por favor corrige los siguientes errores:\n' + errors.join('\n'));
      return;
    }

    try {
      const updatedEmployee = {
        name: form.name,
        lastName: form.lastName,
        birthday: form.birthday,
        hireDate: form.hireDate,
        email: form.email,
        password: form.password,
        telephone: form.telephone,
        dui: form.dui,
        issNumber: form.issNumber,
        gender: form.gender,
        rol: form.rol
      };

      const response = await fetch(`https://proyectomern2b-qwwg.onrender.com/api/employee/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEmployee),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error al actualizar el empleado: ${data.message || 'Error desconocido'}`);
        return;
      }

      alert('Empleado actualizado correctamente');
      navigate('/employee');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el empleado');
    }
  };

  return (
    <>
      <div className="backaddemployee"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to="/employees" className="ap-btn-back">← VOLVER</Link>
      </div>
      <div className="ap-wrapper" data-aos="fade-up">
        <h2 className="text-center text-black mb-4 addemployee-title">Editar Empleado</h2>
        <div className="ap-card rounded p-4 shadow">
          <form className="row g-3" onSubmit={e => e.preventDefault()}>
            {['name','lastName','birthday','hireDate','email','password','telephone','dui','issNumber'].map((field) => (
              <div className="col-6" key={field}>
                <label className="form-label ap-label">
                  {{
                    name: 'Nombre',
                    lastName: 'Apellido',
                    birthday: 'Fecha de Nacimiento',
                    hireDate: 'Fecha de Contratación',
                    email: 'Correo Electrónico',
                    password: 'Contraseña',
                    telephone: 'Teléfono',
                    dui: 'DUI',
                    issNumber: 'Número ISS'
                  }[field]}
                </label>
                <input
                  type={field.includes('Date') ? 'date' : field === 'email' ? 'email' : field === 'password' ? 'password' : 'text'}
                  className="form-control ap-input"
                  name={field}
                  value={form[field] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="col-6">
              <label className="form-label ap-label">Género</label>
              <select className="form-select ap-input" name="gender" value={form.gender || ''} onChange={handleChange}>
                <option value="">Seleccionar Género</option>
                <option value="female">Femenino</option>
                <option value="male">Masculino</option>
              </select>
            </div>

            <div className="col-6">
              <label className="form-label ap-label">Rol</label>
              <select className="form-select ap-input" name="rol" value={form.rol || ''} onChange={handleChange}>
                <option value="">Seleccionar Rol</option>
                <option value="admin">Administrador</option>
                <option value="employee">Empleado</option>
              </select>
            </div>

            <div className="col-12 d-flex gap-3 justify-content-end">
              <button type="button" className="ap-btn-clear" onClick={handleClear}>Limpiar Campos</button>
              <button type="button" className="ap-btn-save" onClick={handleSave}>Guardar Empleado</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditEmployee;
