import { ISalaRepository } from '../../domain/repositories/sala.repository';
import { Sala } from '../../domain/entities/Sala';
import pool from '../database/database';

export class SalaRepository implements ISalaRepository {
  async getAll(): Promise<Sala[]> {
    const [rows] = await pool.query('SELECT * FROM salas');
    return rows as Sala[];
  }

  async getById(id: number): Promise<Sala | null> {
    const [rows] = await pool.query('SELECT * FROM salas WHERE id = ?', [id]);
    return (rows as Sala[])[0] || null;
  }

  async create(sala: Sala): Promise<number> {
    const [result] = await pool.query(
      'INSERT INTO salas (nombre, descripcion, capacidad) VALUES (?, ?, ?)',
      [sala.nombre, sala.descripcion, sala.capacidad]
    );
    return (result as any).insertId;
  }

  async update(id: number, sala: Partial<Sala>): Promise<boolean> {
    const [result] = await pool.query('UPDATE salas SET ? WHERE id = ?', [sala, id]);
    return (result as any).affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM salas WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
  }
}