import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    res.status(401).json({ error: 'Token no proporcionado' });
    return;
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      res.status(403).json({ error: 'Token inválido o expirado' });
      return;
    }

    (req as any).user = user; // Attach the user to the request object
    next();
  });
};