import { User } from '../entities/User';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  create(user: User): Promise<number>;
  update(id: number, user: Partial<User>): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
