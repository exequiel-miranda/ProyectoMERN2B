/*
Como vamos a validar si es cliente o empleado,
entonces importo ambos modelos
*/
import CustomersModel from "../models/customers.js";
import EmployeesModel from "../models/employee.js";
import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { config } from "../config.js";

const loginController = {};

const MAX_ATTEMPTS = 3;               // Máximo de intentos
const LOCK_TIME = 15 * 60 * 1000;     // Tiempo de bloqueo (15 min)

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound; 
    let userType; 

    // 1. Admin
    if (
      email === config.emailAdmin.email &&
      password === config.emailAdmin.password
    ) {
      userType = "Admin";
      userFound = { _id: "Admin" };

    } else {
      // 2. Empleado
      userFound = await EmployeesModel.findOne({ email });
      userType = "Employee";

      // 3. Cliente
      if (!userFound) {
        userFound = await CustomersModel.findOne({ email });
        userType = "Customer";
      }
    }

    // Si no encontramos un usuario
    if (!userFound) {
      return res.json({ message: "User not found" });
    }

    //🧧 Bloqueo: solo para clientes o empleados (no Admin)
    if (userType !== "Admin") {
      // Verificar si el usuario está bloqueado
      if (userFound.lockUntil > Date.now()) {
        const minutosRestantes = Math.ceil((userFound.lockUntil - Date.now()) / 60000);
        return res.status(403).json({
          message: `Account locked. Try again in ${minutosRestantes} minutes`
        });
      }

      // Validar contraseña
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        // Si la contraseña es incorrecta → incrementar intentos
        userFound.loginAttempts = (userFound.loginAttempts || 0) + 1;

        if (userFound.loginAttempts >= MAX_ATTEMPTS) {
          userFound.lockUntil = Date.now() + LOCK_TIME;
          await userFound.save();
          return res.status(403).json({
            message: `Account locked for ${LOCK_TIME / 60000} minutes`
          });
        }

        await userFound.save();
        return res.json({
          message: `Invalid password. Remaining attempts: ${MAX_ATTEMPTS - userFound.loginAttempts}`
        });
      }

      // Si es correcta → resetear intentos
      userFound.loginAttempts = 0;
      userFound.lockUntil = null;
      await userFound.save();
    }

    // Generar token
    const token = jsonwebtoken.sign(
      { id: userFound._id, userType },
      config.JWT.secret,
      { expiresIn: config.JWT.expiresIn }
    );

    // Guardar token en cookie
    res.cookie("authToken", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, 
      path: '/', 
      sameSite: 'lax'
    });

    res.json({ message: "login successful" });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default loginController;
