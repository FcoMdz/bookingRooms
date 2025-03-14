import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/User';
import pool from '../database/database';

export class UserRepository implements IUserRepository {
  async getAll(): Promise<User[]> {
    const [rows] = await pool.query('SELECT id, nombre, email, rol FROM usuarios');
    return rows as User[];
  }

  async getById(id: number): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    return (rows as User[])[0] || null;
  }

  async create(user: User): Promise<number> {
    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
      [
        user.nombre,
        user.email,
        user.password, // Already a Buffer
        user.rol
      ]
    );
    return (result as any).insertId;
  }

  async update(id: number, user: Partial<User>): Promise<boolean> {
    const [result] = await pool.query('UPDATE usuarios SET ? WHERE id = ?', [user, id]);
    return (result as any).affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
  async getByEmail(email: string): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    const userData = (rows as any[])[0];
    if (!userData) return null;
  
    // Map the database row to a User instance
    return new User(
      userData.id,
      userData.nombre,
      userData.email,
      Buffer.from(userData.password), // Convert password to Buffer
      userData.rol
    );
  }
}
