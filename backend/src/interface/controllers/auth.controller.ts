import { Request, Response } from 'express';
import { UserService } from '../../application/services/user.service';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../../domain/entities/User';
import * as jwt from 'jsonwebtoken';

const userService = new UserService(new UserRepository());

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, email, password } = req.body;
      console.log('Received data:', { nombre, email, password }); // Debugging: Log the data
  
      if (!nombre || !email || !password) {
        res.status(400).json({ error: 'Todos los campos son obligatorios' });
        return;
      }
  
      // Convert password to Buffer
      const passwordBuffer = Buffer.from(password, 'utf8');
      const user = new User(null, nombre, email, passwordBuffer);
      await user.hashPassword(); // This will re-hash and update the Buffer
  
      const userId = await userService.createUser(user);
      res.status(201).json({ message: 'Usuario registrado', userId });
    } catch (error: any) {
      if (error.code === 'ER_DUP_ENTRY') {
        res.status(409).json({ error: 'El correo electrónico ya está registrado' });
      } else {
        res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
      }
    }
  };

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email y contraseña son obligatorios' });
      return;
    }

    // Fetch the user by email
    const user = await userService.getUserByEmail(email);
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
      return;
    }

    // Compare the provided password with the stored password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ error: 'Contraseña incorrecta' });
      return;
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id, email: user.email }, 'your-secret-key', {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ message: 'Login exitoso', token });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
  }
};