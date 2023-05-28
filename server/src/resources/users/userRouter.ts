import express from 'express';
import { getSession, isLoggedin, loginUser, logoutUser, registerUser } from "./userController";


export const userRouter = express.Router();

// GET api/users/session

userRouter.get('/session', getSession);

// POST api/users/register
userRouter.post('/register', registerUser);

// POST api/users/login
userRouter.post('/login', loginUser);

// DELETE api/users/logout
userRouter.delete('/logout', logoutUser);


userRouter.get('/isLoggedin', isLoggedin);


