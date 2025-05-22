import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import FirstUse from './pages/firstuse/firstuse.jsx';
import Employees from './pages/employees/employee.jsx';
import Nav from './components/Nav/Nav.jsx';  // Asegúrate que la ruta y extensión son correctas
import AddEmployee from './pages/employees/addEmployees.jsx';
import EditEmployee from './pages/employees/EditEmployee';
import Products from './pages/products/products.jsx';
import AddProduct from './pages/products/addProducts.jsx';
import EditProduct from './pages/products/editProducts.jsx';
import Branches from './pages/branches/branches.jsx';
import AddBranch from './pages/branches/addBrances.jsx';
import EditBranches from './pages/branches/editBranches.jsx';

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<FirstUse />} />
        <Route path="/employee" element={<Employees />} />
        <Route path="/addEmployee" element={<AddEmployee />} />
        <Route path="/editEmployee" element={<EditEmployee />} />
        <Route path="/products" element={<Products />} />
        <Route path="/addProducts" element={<AddProduct />} />
        <Route path="/editProducts" element={<EditProduct />} />
        <Route path="/branches" element={<Branches />} />
         <Route path="/addBranches" element={<AddBranch />} />
         <Route path="/editBranches" element={<EditBranches />} />
      </Routes>
    </>
  );
}

export default App;





