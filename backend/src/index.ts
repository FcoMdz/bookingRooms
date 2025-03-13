import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import userRoutes from './interface/routes/user.routes';
import salaRoutes from './interface/routes/user.routes';
import reservaRoutes from './interface/routes/user.routes';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/api/user', userRoutes);
app.use('/api/salas', salaRoutes);
app.use('/api/reservas', reservaRoutes);
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
