import argon2 from 'argon2';
import { Request, Response } from "express";
import { UserModel } from "./userModel";



// GET api/users/session
export const getSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("Active session is user:", req.session);
  try {
    if (req.session && req.session.user) {
      // If a user is logged in, retrieve their session
      const user = await UserModel.findById(req.session.user._id);

      if (user) {
        // Send the session information if found
        const userData = user.toObject() as any;
        delete userData.password;
        res.send({ user: userData });
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.status(401).send("No active session");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
};
// POST api/users/register
export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body)
  try {
    // Tar in parametrar från form i registerform
    const { email, password } = req.body;
    const hashedPassword = await argon2.hash(password, {
      timeCost: 2,
      memoryCost: 1024
    });
    // Hashar lösenord och skapar ny user från vår schema
    const user = new UserModel({ email, password: hashedPassword });

    // Sparar användaren till databasen
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
// POST api/users/login
export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log(req.body)

  const user = await UserModel.findOne({ email: req.body.email});
  if (user) {
    console.log(user)
    const isAuth = await argon2.verify(user.password, req.body.password);
    if (isAuth) {
      req.session!.user = user
      

      const userData = user.toObject() as any;
      delete userData.password;
      console.log(req.session )
      res.status(201).send({ message: "User login successfully" });
    } else {
      res.status(401).json({ error: "Wrong password"});
    }
  } else {
    res.status(401).json({ error: "Wrong username"});
  }

};

// DELETE api/users/logout
export async function logoutUser(req: Request, res: Response) {
  req.session = null;
  res.status(204).json(null);
}