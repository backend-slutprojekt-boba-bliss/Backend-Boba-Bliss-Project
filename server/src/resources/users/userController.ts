import argon2 from "argon2";
import { Request, Response } from "express";
import * as yup from "yup";
import { UserModel } from "./userModel";

const userSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

// GET api/users/session
export const getSession = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    if (req.session && req.session.user) {
      // Om en User är inloggad, hämta sessionen
      const user = await UserModel.findById(req.session.user._id);

      if (user) {
        // Skicka session information om vi hittar user
        const userData = user.toObject() as any;
        delete userData.password;
        res.status(200).send({ user: userData });
      } else {
        res.status(404).send("User not found");
      }
    } else {
      res.status(201).send("No active session");
    }
  } catch (error: any) {
    console.error(error);
    res.status(500).send(`Internal Server Error ${error.message}`);
  }
};

// POST api/users/register
export const registerUser = async (req: Request, res: Response) => {
  try {
    // Tar in parametrar från form i registerform
    const { email, password } = req.body;

    try {
      await userSchema.validate({ email, password });
      const existingUser = await UserModel.findOne({ email: req.body.email });
      if (existingUser) {
        return res.status(409).json("Email is already registered");
      }
    } catch (validationError: any) {
      res.status(400).send(validationError.errors);
      return;
    }

    const hashedPassword = await argon2.hash(password, {
      timeCost: 2,
      memoryCost: 1024,
    });
    // Hashar lösenord och skapar ny user från vår schema
    const user = new UserModel({ email, password: hashedPassword });
    // Sparar användaren till databasen
    await user.save();

    res.status(201).send({ message: "User registered successfully" });
  } catch (error: any) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// POST api/users/login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const user = await UserModel.findOne({ email: req.body.email });
  if (user) {
    const { email, password } = req.body;

    try {
      await userSchema.validate({ email, password });
    } catch (validationError: any) {
      res.status(400).send(validationError.errors);
      return;
    }

    const isAuth = await argon2.verify(user.password, req.body.password);
    if (isAuth) {
      req.session!.user = user;
      const userData = user.toObject() as any;
      delete userData.password;
      res.status(201).send({
        message: "User logged in",
        userData: userData,
      });
    } else {
      res.status(401).json({ error: "Wrong password" });
    }
  } else {
    res.status(401).json({ error: "Wrong username" });
  }
};

// DELETE api/users/logout
export async function logoutUser(req: Request, res: Response) {
  req.session = null;
  res.status(204).json(null);
}

// Check if user is logged in
export function isLoggedin(req: Request, res: Response) {
  if (!req.session || !req.session.user) {
    res.status(200).json({ isLoggedIn: false });
    return;
  }

  // User is logged in, send isLoggedIn as true
  res.status(200).json({ isLoggedIn: true });
}
