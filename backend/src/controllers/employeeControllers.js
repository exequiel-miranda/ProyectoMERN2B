//Array de metodos (C R U D)
const employeeController = {};
import employeeModel from "../models/employee.js";

// SELECT
employeeController.getemployee = async (req, res) => {
  const employee = await employeeModel.find();
  res.json(employee);
};

// INSERT
employeeController.createemployee = async (req, res) => {
  try {
    //1-Pido todos los valores
    const {
      name,
      lastName,
      birthday,
      email,
      password,
      telephone,
      dui,
      issNumber,
      hireDate,
    } = req.body;

    if(!dui){
      return res.status(500).json({message: "Necesita un dui"})
    }

    if(edad < 18){
      return res.status(500).json({message: "Error debe ser mayor de edad"})
    }

    //2- Guardo los valores en la base de datos
    const newemployee = new employeeModel({
      name,
      lastName,
      birthday,
      email,
      password,
      telephone,
      dui,
      issNumber,
      hireDate,
    });
    await newemployee.save();
    res.status(200).json({ message: "employee save" });
  } catch (error) {

    res.status(500).json({message: "error internal server error"+error})
  }
};

// DELETE
employeeController.deleteemployee = async (req, res) => {
  const deletedemployee = await employeeModel.findByIdAndDelete(req.params.id);
  if (!deletedemployee) {
    return res.status(404).json({ message: "employee dont find" });
  }
  res.json({ message: "employee deleted" });
};

// UPDATE
employeeController.updateemployee = async (req, res) => {
  // Solicito todos los valores
  const {
    name,
    lastName,
    birthday,
    email,
    password,
    telephone,
    dui,
    issNumber,
    hireDate,
  } = req.body;
  // Actualizo
  await employeeModel.findByIdAndUpdate(
    req.params.id,
    {
      name,
      lastName,
      birthday,
      email,
      password,
      telephone,
      dui,
      issNumber,
      hireDate,
    },
    { new: true }
  );
  // muestro un mensaje que todo se actualizo
  res.json({ message: "employee update" });
};

export default employeeController;
