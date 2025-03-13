import express from 'express';
import {
  getAllSalas,
  getSalaById,
  createSala,
  updateSala,
  deleteSala,
} from '../controllers/sala.controller';

const salaRouter = express.Router();
salaRouter.get('/', getAllSalas);
salaRouter.get('/:id', getSalaById);
salaRouter.post('/', createSala);
salaRouter.put('/:id', updateSala);
salaRouter.delete('/:id', deleteSala);

export default salaRouter;