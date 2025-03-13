import { Request, Response } from 'express';
import { UserService } from '../../application/services/user.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../../domain/entities/User';

const userService = new UserService(new UserRepository());

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener los usuarios', details: error.message });
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'ID de usuario no válido' });
      return;
    }

    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json(user);
  } catch (error: any) {
    res.status(500).json({ error: 'Error al obtener el usuario', details: error.message });
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      res.status(400).json({ error: 'Todos los campos son obligatorios' });
      return;
    }

    const userId = await userService.createUser(new User(null, nombre, email, password));
    res.status(201).json({ message: 'Usuario creado', userId });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al crear el usuario', details: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'ID de usuario no válido' });
      return;
    }

    const { nombre, email, password } = req.body;
    if (!nombre || !email) {
      res.status(400).json({ error: 'Nombre y email son obligatorios' });
      return;
    }

    const success = await userService.updateUser(userId, new User(userId, nombre, email, password));
    if (!success) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json({ message: 'Usuario actualizado' });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al actualizar el usuario', details: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    if (isNaN(userId)) {
      res.status(400).json({ error: 'ID de usuario no válido' });
      return;
    }

    const success = await userService.deleteUser(userId);
    if (!success) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    res.json({ message: 'Usuario eliminado' });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al eliminar el usuario', details: error.message });
  }
};