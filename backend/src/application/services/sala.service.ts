import { ISalaRepository } from '../../domain/repositories/sala.repository';
import { Sala } from '../../domain/entities/Sala';

export class SalaService {
  constructor(private repository: ISalaRepository) {}

  getAllSalas() {
    return this.repository.getAll();
  }

  getSalaById(id: number) {
    return this.repository.getById(id);
  }

  createSala(sala: Sala) {
    return this.repository.create(sala);
  }

  updateSala(id: number, sala: Partial<Sala>) {
    return this.repository.update(id, sala);
  }

  deleteSala(id: number) {
    return this.repository.delete(id);
  }
}