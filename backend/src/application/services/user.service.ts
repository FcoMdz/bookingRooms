import { IUserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/User';

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  getUsers() {
    return this.userRepository.getAll();
  }

  getUserById(id: number) {
    return this.userRepository.getById(id);
  }

  createUser(user: User) {
    return this.userRepository.create(user);
  }

  updateUser(id: number, user: Partial<User>) {
    return this.userRepository.update(id, user);
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }
  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.getByEmail(email);
  }
}
