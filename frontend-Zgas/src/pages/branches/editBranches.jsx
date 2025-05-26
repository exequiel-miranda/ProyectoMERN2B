import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './EditBranches.css'; // Usa el CSS que prefieras
import AOS from 'aos';
import 'aos/dist/aos.css';

const EditBranches = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    name: '',
    address: '',
    phone: '',
    email: '',
    manager: '',
    city: '',
    country: ''
  });

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  useEffect(() => {
    if (!location.state) {
      alert('¡No se encontraron datos de la sucursal para editar!');
      navigate('/branches');
      return;
    }
    const { _id, ...rest } = location.state;
    // Aquí cargas toda la info que llega, asegurando que también city y country estén en el form
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
      address: '',
      phone: '',
      email: '',
      manager: '',
      city: '',
      country: ''
    });
  };

  const handleSave = async () => {
    // Validar campos obligatorios (puedes agregar más si lo necesitas)
    const requiredFields = [
      { name: 'name', label: 'Nombre' },
      { name: 'address', label: 'Dirección' },
      // Si quieres que city y country sean obligatorios, agrégalos aquí:
      // { name: 'city', label: 'Ciudad' },
      // { name: 'country', label: 'País' },
    ];

    const errors = [];

    requiredFields.forEach(field => {
      if (!form[field.name] || form[field.name].toString().trim() === '') {
        errors.push(`El campo ${field.label} es obligatorio.`);
      }
    });

    // Validar email si está presente
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) {
      errors.push('El correo electrónico debe ser válido.');
    }

    // Validar teléfono (8 a 15 dígitos numéricos)
    if (form.phone && !/^\d{8,15}$/.test(form.phone)) {
      errors.push('El teléfono debe tener entre 8 y 15 dígitos numéricos.');
    }

    if (errors.length > 0) {
      alert('Por favor corrige los siguientes errores:\n' + errors.join('\n'));
      return;
    }

    try {
      const updatedBranch = {
        name: form.name,
        address: form.address,
        phone: form.phone,
        email: form.email,
        manager: form.manager,
        city: form.city,
        country: form.country
      };

      const response = await fetch(`https://proyectomern2b-qwwg.onrender.com/api/branches/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBranch),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error al actualizar la sucursal: ${data.message || 'Error desconocido'}`);
        return;
      }

      alert('Sucursal actualizada correctamente');
      navigate('/branches');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la sucursal');
    }
  };

  return (
    <>
      <div className="backbranches"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to="/branches" className="ap-btn-back">← VOLVER</Link>
      </div>
      <div className="ap-wrapper" data-aos="fade-up">
        <h2 className="text-center text-black mb-4 addbranches-title">Editar Sucursal</h2>
        <div className="ap-card rounded p-4 shadow">
          <form className="row g-3" onSubmit={e => e.preventDefault()}>
            {['name', 'address', 'phone', 'email', 'manager', 'city', 'country'].map(field => (
              <div className="col-6" key={field}>
                <label className="form-label ap-label">
                  {{
                    name: 'Nombre',
                    address: 'Dirección',
                    phone: 'Teléfono',
                    email: 'Correo Electrónico',
                    manager: 'Encargado',
                    city: 'Ciudad',
                    country: 'País',
                  }[field]}
                </label>
                <input
                  type={field === 'email' ? 'email' : 'text'}
                  className="form-control ap-input"
                  name={field}
                  value={form[field] || ''}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="col-12 d-flex gap-3 justify-content-end">
              <button type="button" className="ap-btn-clear" onClick={handleClear}>Limpiar Campos</button>
              <button type="button" className="ap-btn-save" onClick={handleSave}>Guardar Sucursal</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditBranches;
