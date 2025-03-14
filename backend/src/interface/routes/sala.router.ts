import express from 'express';
import {
  getAllSalas,
  getSalaById,
  createSala,
  updateSala,
  deleteSala,
} from '../controllers/sala.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const salaRouter = express.Router();
salaRouter.get('/', getAllSalas);
salaRouter.get('/:id', getSalaById);
salaRouter.post('/',authenticateToken, createSala);
salaRouter.put('/:id',authenticateToken, updateSala);
salaRouter.delete('/:id',authenticateToken, deleteSala);

export default salaRouter;