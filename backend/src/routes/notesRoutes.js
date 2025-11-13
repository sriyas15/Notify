import express from 'express';
import { getNotes,getNotesById,uploadNotes,updateNotes,deleteNotes } from '../controller/notesController.js';

const router = express.Router();

router.get("/",getNotes);
router.get("/:id",getNotesById);
router.post("/",uploadNotes);
router.put("/:id",updateNotes);
router.delete("/:id",deleteNotes);

export default router;