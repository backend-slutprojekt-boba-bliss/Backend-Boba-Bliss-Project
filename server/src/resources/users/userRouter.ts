import express from 'express';
const UserRouter = express.Router();
import { getSession, registerUser, loginUser, logoutUser } from "./userController";

// GET api/users/session
UserRouter.get('/api/session', getSession);

// POST api/users/register
UserRouter.post('/api/register', registerUser);

// POST api/users/login
UserRouter.post('/api/login', loginUser);

// DELETE api/users/logout
UserRouter.delete('api//logout', logoutUser);

module.exports = UserRouter;
