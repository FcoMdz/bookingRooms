import { Request, Response } from 'express';
import { SalaService } from '../../application/services/sala.service';
import { SalaRepository } from '../../infrastructure/repositories/sala.respository';
import { Sala } from '../../domain/entities/Sala';

const salaService = new SalaService(new SalaRepository());

export const getAllSalas = async (req: Request, res: Response): Promise<void> => {
  try {
    const salas = await salaService.getAllSalas();
    res.json(salas);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener las salas', details: error.message });
  }
};

export const getSalaById = async (req: Request, res: Response): Promise<void> => {
  try {
    const salaId = Number(req.params.id);
    if (isNaN(salaId)) {
      res.status(400).json({ error: 'ID de sala no válido' });
      return;
    }

    const sala = await salaService.getSalaById(salaId);
    if (!sala) {
      res.status(404).json({ error: 'Sala no encontrada' });
      return;
    }

    res.json(sala);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener la sala', details: error.message });
  }
};

export const createSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, descripcion, capacidad } = req.body;
    if (!nombre || !descripcion || !capacidad) {
      res.status(400).json({ error: 'Todos los campos son obligatorios' });
      return;
    }

    const salaId = await salaService.createSala(new Sala(null, nombre, descripcion, capacidad));
    res.status(201).json({ message: 'Sala creada', salaId });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear la sala', details: error.message });
  }
};

export const updateSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const salaId = Number(req.params.id);
    if (isNaN(salaId)) {
      res.status(400).json({ error: 'ID de sala no válido' });
      return;
    }

    const { nombre, descripcion, capacidad } = req.body;
    if (!nombre || !descripcion || !capacidad) {
      res.status(400).json({ error: 'Todos los campos son obligatorios' });
      return;
    }

    const success = await salaService.updateSala(salaId, { nombre, descripcion, capacidad });
    if (!success) {
      res.status(404).json({ error: 'Sala no encontrada' });
      return;
    }

    res.json({ message: 'Sala actualizada' });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al actualizar la sala', details: error.message });
  }
};

export const deleteSala = async (req: Request, res: Response): Promise<void> => {
  try {
    const salaId = Number(req.params.id);
    if (isNaN(salaId)) {
      res.status(400).json({ error: 'ID de sala no válido' });
      return;
    }

    const success = await salaService.deleteSala(salaId);
    if (!success) {
      res.status(404).json({ error: 'Sala no encontrada' });
      return;
    }

    res.json({ message: 'Sala eliminada' });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al eliminar la sala', details: error.message });
  }
};