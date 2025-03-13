import { IReservaRepository } from '../../domain/repositories/reserva.repository';
import { Reserva } from '../../domain/entities/Reserva';
import pool from '../database/database';

export class ReservaRepository implements IReservaRepository {
  getAll(): Promise<Reserva[]> {
      throw new Error('Method not implemented.');
  }
  getById(id: number): Promise<Reserva | null> {
      throw new Error('Method not implemented.');
  }
  create(reserva: Reserva): Promise<number> {
      throw new Error('Method not implemented.');
  }
  update(id: number, reserva: Partial<Reserva>): Promise<boolean> {
      throw new Error('Method not implemented.');
  }
  delete(id: number): Promise<boolean> {
      throw new Error('Method not implemented.');
  }
  async checkAvailability(salaId: number, start: Date, end: Date): Promise<boolean> {
    const [rows] = await pool.query(
      `SELECT id FROM reservas 
      WHERE sala_id = ? AND estado = 'reservada'
      AND ((hora_inicio BETWEEN ? AND ?) 
      OR (hora_fin BETWEEN ? AND ?) 
      OR (? BETWEEN hora_inicio AND hora_fin))`,
      [salaId, start, end, start, end, start]
    );
    return (rows as any[]).length === 0;
  }

  async liberarReserva(id: number): Promise<boolean> {
    const [result] = await pool.query(
      "UPDATE reservas SET estado = 'liberada' WHERE id = ?",
      [id]
    );
    return (result as any).affectedRows > 0;
  }

  // Implement other CRUD methods similar to SalaRepository
  // [getAll, getById, create, update, delete]...
}