import { Request, Response } from 'express';
import { ReservaService } from '../../application/services/reserva.service';
import { ReservaRepository } from '../../infrastructure/repositories/reserva.repository';
import { Reserva } from '../../domain/entities/Reserva';

const reservaService = new ReservaService(new ReservaRepository());

export const createReserva = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sala_id, hora_inicio, hora_fin } = req.body;

    // Convert hora_inicio and hora_fin to Date objects
    const horaInicioDate = new Date(hora_inicio);
    const horaFinDate = new Date(hora_fin);

    // Validate that hora_inicio and hora_fin are valid dates
    if (isNaN(horaInicioDate.getTime()) || isNaN(horaFinDate.getTime())) {
      res.status(400).json({ error: 'hora_inicio y hora_fin deben ser fechas válidas' });
      return;
    }

    // Check reservation duration
    const duration = Math.abs(horaFinDate.getTime() - horaInicioDate.getTime()) / (1000 * 60 * 60); // Duration in hours
    if (duration > 2) {
      res.status(400).json({ error: 'La reserva no puede exceder 2 horas' });
      return;
    }

    // Check sala availability
    const isAvailable = await reservaService.checkAvailability(sala_id, horaInicioDate, horaFinDate);
    if (!isAvailable) {
      res.status(400).json({ error: 'La sala no está disponible en este horario' });
      return;
    }

    // Create the reservation
    const reserva = new Reserva(null, sala_id, req.body.usuario_id, horaInicioDate, horaFinDate, 'reservada');
    const reservaId = await reservaService.create(reserva);
    res.status(201).json({ message: 'Reserva creada', reservaId });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear la reserva', details: error.message });
  }
};
export const liberarReserva = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservaId = Number(req.params.id);
    if (isNaN(reservaId)) {
      res.status(400).json({ error: 'ID de reserva no válido' });
      return;
    }

    const success = await reservaService.liberarReserva(reservaId);
    if (!success) {
      res.status(404).json({ error: 'Reserva no encontrada' });
      return;
    }

    res.json({ message: 'Reserva liberada' });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al liberar la reserva', details: error.message });
  }
};

export const getAllReservas = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservas = await reservaService.getAll();
    res.json(reservas);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener las reservas', details: error.message });
  }
};

export const getReservaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservaId = Number(req.params.id);
    if (isNaN(reservaId)) {
      res.status(400).json({ error: 'ID de reserva no válido' });
      return;
    }

    const reserva = await reservaService.getById(reservaId);
    if (!reserva) {
      res.status(404).json({ error: 'Reserva no encontrada' });
      return;
    }

    res.json(reserva);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener la reserva', details: error.message });
  }
};

export const updateReserva = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservaId = Number(req.params.id);
    if (isNaN(reservaId)) {
      res.status(400).json({ error: 'ID de reserva no válido' });
      return;
    }

    const { sala_id, usuario_id, hora_inicio, hora_fin, estado } = req.body;
    if (!sala_id || !usuario_id || !hora_inicio || !hora_fin || !estado) {
      res.status(400).json({ error: 'Todos los campos son obligatorios' });
      return;
    }

    const success = await reservaService.update(reservaId, {
      sala_id,
      usuario_id,
      hora_inicio: new Date(hora_inicio),
      hora_fin: new Date(hora_fin),
      estado,
    });
    if (!success) {
      res.status(404).json({ error: 'Reserva no encontrada' });
      return;
    }

    res.json({ message: 'Reserva actualizada' });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al actualizar la reserva', details: error.message });
  }
};

export const deleteReserva = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservaId = Number(req.params.id);
    if (isNaN(reservaId)) {
      res.status(400).json({ error: 'ID de reserva no válido' });
      return;
    }

    const success = await reservaService.delete(reservaId);
    if (!success) {
      res.status(404).json({ error: 'Reserva no encontrada' });
      return;
    }

    res.json({ message: 'Reserva eliminada' });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al eliminar'});
    return;
  }
}