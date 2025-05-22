import express from "express";
import multer from "multer";
import blogController from "../controllers/blogController.js";

const router = express.Router();
const upload = multer({ dest: "public/" });

router.get("/", blogController.getAllBlog);
router.post("/", upload.single("image"), blogController.createBlog);
router.put("/:id", upload.single("image"), blogController.updateBlog);

// ⚠️ ESTA ES LA QUE TE FALTA
router.delete("/:id", blogController.deleteBlog); 

export default router;

