export class Sala {
    constructor(
      public id: number | null,
      public nombre: string,
      public descripcion: string,
      public capacidad: number,
      public created_at?: Date,
      public updated_at?: Date
    ) {}
  }