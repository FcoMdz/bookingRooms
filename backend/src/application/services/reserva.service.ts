import { IReservaRepository } from '../../domain/repositories/reserva.repository';
import { Reserva } from '../../domain/entities/Reserva';
import pool from '../../infrastructure/database/database';
export class ReservaService {
  constructor(private repository: IReservaRepository) {}

  async getAll(): Promise<Reserva[]> {
    const [rows] = await pool.query('SELECT * FROM reservas');
    return rows as Reserva[];
  }

  async getById(id: number): Promise<Reserva | null> {
    const [rows] = await pool.query('SELECT * FROM reservas WHERE id = ?', [id]);
    return (rows as Reserva[])[0] || null;
  }

  async create(reserva: Reserva): Promise<number> {
    const [result] = await pool.query(
      `INSERT INTO reservas 
      (sala_id, usuario_id, hora_inicio, hora_fin, estado) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        reserva.sala_id,
        reserva.usuario_id,
        reserva.hora_inicio,
        reserva.hora_fin,
        reserva.estado,
      ]
    );
    return (result as any).insertId;
  }

  async update(id: number, reserva: Partial<Reserva>): Promise<boolean> {
    const [result] = await pool.query('UPDATE reservas SET ? WHERE id = ?', [
      reserva,
      id,
    ]);
    return (result as any).affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query('DELETE FROM reservas WHERE id = ?', [id]);
    return (result as any).affectedRows > 0;
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
  
}