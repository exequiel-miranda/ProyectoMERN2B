import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './editProducts.css'; // Asegúrate de tener este archivo o usa tu estilo existente

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  useEffect(() => {
    if (!location.state) {
      alert('¡No se encontraron datos del producto para editar!');
      navigate('/products');
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
      description: '',
      price: '',
      stock: '',
    });
  };

  const handleSave = async () => {
    const { name, description, price, stock } = form;

    const errors = [];

    if (!name.trim()) errors.push('El nombre del producto es obligatorio.');
    if (!description.trim()) errors.push('La descripción es obligatoria.');
    if (!price || isNaN(price) || Number(price) < 0) errors.push('El precio debe ser un número positivo.');
    if (!stock || isNaN(stock) || Number(stock) < 0) errors.push('El stock debe ser un número positivo.');

    if (errors.length > 0) {
      alert('Corrige los siguientes errores:\n' + errors.join('\n'));
      return;
    }

    try {
      const response = await fetch(`https://proyectomern2b-qwwg.onrender.com/api/products/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, description, price, stock }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error al actualizar el producto: ${data.message || 'Error desconocido'}`);
        return;
      }

      alert('Producto actualizado correctamente');
      navigate('/products');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar el producto');
    }
  };

  return (
    <>
      <div className="backaddemployee"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to="/products" className="ap-btn-back">← VOLVER</Link>
      </div>
      <div className="ap-wrapper" data-aos="fade-up">
        <h2 className="text-center text-black mb-4 addemployee-title">Editar Producto</h2>
        <div className="ap-card rounded p-4 shadow">
          <form className="row g-3" onSubmit={e => e.preventDefault()}>
            <div className="col-6">
              <label className="form-label ap-label">Nombre</label>
              <input
                type="text"
                className="form-control ap-input"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label ap-label">Precio</label>
              <input
                type="number"
                step="0.01"
                className="form-control ap-input"
                name="price"
                value={form.price}
                onChange={handleChange}
              />
            </div>
            <div className="col-12">
              <label className="form-label ap-label">Descripción</label>
              <textarea
                className="form-control ap-input"
                name="description"
                value={form.description}
                onChange={handleChange}
              />
            </div>
            <div className="col-6">
              <label className="form-label ap-label">Stock</label>
              <input
                type="number"
                className="form-control ap-input"
                name="stock"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <div className="col-12 d-flex gap-3 justify-content-end">
              <button type="button" className="ap-btn-clear" onClick={handleClear}>Limpiar</button>
              <button type="button" className="ap-btn-save" onClick={handleSave}>Guardar Cambios</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProduct;
