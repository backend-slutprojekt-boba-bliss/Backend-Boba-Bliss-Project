import express from 'express';
const UserRouter = express.Router();
import { getSession, registerUser, loginUser, logoutUser } from "./userController";

// GET api/users/session
UserRouter.get('/session', getSession);

// POST api/users/register
UserRouter.post('/register', registerUser);

// POST api/users/login
UserRouter.post('/login', loginUser);

// DELETE api/users/logout
UserRouter.delete('/logout', logoutUser);

module.exports = UserRouter;
