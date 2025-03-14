import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import userRoutes from './interface/routes/user.routes';
import salaRoutes from './interface/routes/sala.router';
import reservaRoutes from './interface/routes/reserva.router';
import authRoutes from './interface/routes/auth.routes';
const cors = require('cors');


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/api/user', userRoutes);
app.use('/api/salas', salaRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/auth', authRoutes);


app.listen(process.env.PORT || 3010, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
