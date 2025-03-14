import { CronJob } from 'cron';
import { ReservaService } from '../../application/services/reserva.service';
import { ReservaRepository } from '../repositories/reserva.repository';

// Assuming ReservaService requires a repository in its constructor
const reservaService = new ReservaService(new ReservaRepository());

// Example cron job
const job = new CronJob('0 * * * * *', () => {
    const now = new Date();
    reservaService.liberarReservasExpiradas(now);
});

job.start();