import express from 'express';
import {
  createReserva,
  liberarReserva,
  getAllReservas,
  getReservaById,
  updateReserva,
  deleteReserva,
} from '../controllers/reserva.controller';

const reservaRouter = express.Router();
reservaRouter.get('/', getAllReservas);
reservaRouter.get('/:id', getReservaById);
reservaRouter.post('/', createReserva);
reservaRouter.patch('/:id/liberar', liberarReserva);
reservaRouter.put('/:id', updateReserva);
reservaRouter.delete('/:id', deleteReserva);

export default reservaRouter;