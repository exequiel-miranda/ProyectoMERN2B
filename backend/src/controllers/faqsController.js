import faqsModel from "../models/faqs.js";

const faqsController = {};

//SELECT
faqsController.getAllFaqs = async (req, res) => {
  try {
    const faqs = await faqsModel.find();
    res.status(200).json(faqs);
  } catch (error) {
    console.log("Error" + error);
    res.status(500).json({ message: "Error finding faqs" });
  }
};

//INSERT
faqsController.insertFaqs = async (req, res) => {
  const { question, answer, level, isActive } = req.body;

  try {
    //Validamos que los campos no vengan vacios
    if (!question || !answer || !level || isActive) {
      return res.status(400).json({ message: "Ingrese todos los datos" });
    }

    if (level > 5 || level < 1) {
      return res.status(400).json({ message: "Ingrese un valor correcto" });
    }

    //El campo question y pregunta no puede tener menos de 4 caracteres
    if (question.length < 4 || answer.length < 4) {
      return res.status(400).json({ message: "Debe tener al menos 4 caracteres" });
    }


    //Guardar en la base de datos
    const newFaqs = new faqsModel({
      question,
      answer,
      level,
      isActive,
    });

    newFaqs.save();

    res.status(200).json({ message: "Faq saved" });
  } catch (error) {
    console.log("Error" + error);
    res.status(400).json({ message: "Error saving" });
  }
};

//ACTUALIZAR
faqsController.updateFaqs = async (req, res) => {
  try {
    const { question, answer, level, isActive } = req.body;

    //Validacion
    if (level > 5 || level < 1) {
      return res.status(400).json({ message: "Ingrese un valor correcto" });
    }

    //Actualizar los campos en la base de datos
    const updatedFaqs = await faqsModel.findByIdAndUpdate(
      req.params.id,
      { question, answer, level, isActive },
      { new: true }
    );

    if (!updatedFaqs) {
      return res.status(400).json({ message: "Faqs not found" });
    }

    res.status(200).json({ message: "Faqs updated successfully" });
  } catch (error) {
    console.log("error" + error);
    res.status(400).json({ message: "Error updating faqs" });
  }
};

faqsController.deleteFaqs = async (req, res) => {
  try {
    const deletedFaqs = await faqsModel.findByIdAndDelete(req.params.id);

    if (!deletedFaqs) {
      return res.status(400).json({ message: "faqs not found" });
    }

    res.status(200).json({ message: "faqs deleted" });
  } catch (error) {
    console.log("error" + error);
    res.status(400).json({ message: "error" });
  }
};

export default faqsController;
