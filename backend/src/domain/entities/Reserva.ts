export class Reserva {
    constructor(
      public id: number | null,
      public sala_id: number,
      public usuario_id: number,
      public hora_inicio: Date,
      public hora_fin: Date,
      public estado: 'reservada' | 'liberada' | 'finalizada' = 'reservada',
      public created_at?: Date,
      public updated_at?: Date
    ) {}
  }