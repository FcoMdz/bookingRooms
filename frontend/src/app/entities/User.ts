export class User {
    constructor(
      public id: number | null,
      public nombre: string,
      public email: string,
      public password: string,
      public rol: number = 0
    ) {}
  }
  