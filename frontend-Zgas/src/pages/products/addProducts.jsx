import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './addProducts.css';

const AddProduct = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, easing: 'ease-in-out', once: true, offset: 200 });
  }, []);

  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleClear = () => {
    setForm({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
    });
  };

  const handleSave = async () => {
    if (!form.name || !form.price) {
      alert('Por favor completa los campos requeridos: nombre y precio.');
      return;
    }

    try {
      const response = await fetch('https://proyectomern2b-qwwg.onrender.com/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price),
          stock: form.stock ? parseInt(form.stock, 10) : 0,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al guardar producto');
      }

      alert('Producto guardado correctamente.');
      handleClear();
      navigate('/products');
    } catch (error) {
      alert('Error guardando producto: ' + error.message);
    }
  };

  return (
    <>
      <div className="backaddproduct"></div>
      <div className="btn-marginpd margin-top-global">
        <Link to="/productos" className="ap-btn-back">← VOLVER</Link>
      </div>

      <div className="ap-wrapper">
        <h2 className="text-center text-black mb-4 addproduct-title">AGREGAR NUEVO PRODUCTO</h2>
        <div className="ap-card rounded p-4 shadow">
          <form
            className="row g-3"
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="col-md-6">
              <label className="form-label ap-label">Nombre *</label>
              <input
                type="text"
                className="form-control ap-input"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Nombre del producto"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label ap-label">Precio *</label>
              <input
                type="number"
                className="form-control ap-input"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="Precio"
                min="0"
                step="0.01"
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label ap-label">Descripción</label>
              <textarea
                className="form-control ap-input"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Descripción del producto"
                rows="3"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label ap-label">Categoría</label>
              <input
                type="text"
                className="form-control ap-input"
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Categoría"
              />
            </div>

            <div className="col-md-6">
              <label className="form-label ap-label">Stock</label>
              <input
                type="number"
                className="form-control ap-input"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                placeholder="Cantidad en stock"
                min="0"
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
                Guardar producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
