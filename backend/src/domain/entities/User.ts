import * as bcrypt from 'bcrypt';
const saltRounds = 10;
export class User {
    constructor(
      public id: number | null,
      public nombre: string,
      public email: string,
      public password: Buffer,
      public rol: number = 0
    ) {}
    // Hash the password and convert to Buffer
    async hashPassword(): Promise<void> {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(this.password.toString(), saltRounds);
      this.password = Buffer.from(hashedPassword, 'utf8');
    }

    // Compare the provided password with the stored Buffer
    async comparePassword(candidatePassword: string): Promise<boolean> {
      const storedPassword = this.password.toString('utf8'); // Convert Buffer to string
      return await bcrypt.compare(candidatePassword, storedPassword);
    }
  }
  