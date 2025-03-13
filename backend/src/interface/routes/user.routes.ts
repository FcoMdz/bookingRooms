import express from 'express'
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller';


const usuarioRouter = express.Router();
usuarioRouter.get('/', getAllUsers);
usuarioRouter.get('/:id', getUserById);
usuarioRouter.post('/', createUser);
usuarioRouter.put('/update/:id', updateUser);
usuarioRouter.delete('/delete/:id', deleteUser);

export default usuarioRouter;