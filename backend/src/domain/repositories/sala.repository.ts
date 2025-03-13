import { Sala } from '../entities/Sala';

export interface ISalaRepository {
  getAll(): Promise<Sala[]>;
  getById(id: number): Promise<Sala | null>;
  create(sala: Sala): Promise<number>;
  update(id: number, sala: Partial<Sala>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}