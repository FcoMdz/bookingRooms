import { Reserva } from '../entities/Reserva';

export interface IReservaRepository {
  getAll(): Promise<Reserva[]>;
  getById(id: number): Promise<Reserva | null>;
  create(reserva: Reserva): Promise<number>;
  update(id: number, reserva: Partial<Reserva>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
  checkAvailability(salaId: number, start: Date, end: Date): Promise<boolean>;
  liberarReserva(id: number): Promise<boolean>;
}