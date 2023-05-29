import express from 'express';
import { getSession, loginUser, logoutUser, registerUser } from "./userController";


export const userRouter = express.Router();

// GET api/users/session

userRouter.get('/session', getSession);

// POST api/users/register
userRouter.post('/register', registerUser);

// POST api/users/login
userRouter.post('/login', loginUser);

// DELETE api/users/logout
userRouter.delete('/logout', logoutUser);


// userRouter.get('/isLoggedin', isLoggedin);

// CHECK IF LOGGED IN ----------------------------------------------------------
// export function checkIfLoggedIn(req: Request, res: Response) {
//   const email = req.session?.email;
//   const isAdmin = req.session?.isAdmin;
//   const publicSession = { email, isAdmin };

//   res.status(200).json(publicSession);
// }


