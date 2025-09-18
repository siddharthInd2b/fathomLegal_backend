import express from "express";
import {
  createTemplate,
  deleteTemplate,
  getAllTemplates,
  updateTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

router.get("/", getAllTemplates);
router.post("/", createTemplate);
router.put("/:id", updateTemplate);
router.delete("/:id", deleteTemplate);

export default router;
