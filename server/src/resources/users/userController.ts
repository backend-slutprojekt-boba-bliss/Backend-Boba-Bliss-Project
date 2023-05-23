import { Request, Response } from "express";
import { Session } from "express-session";
const argon2 = require("argon2");
const { userSchema, UserModel } = require("./userModel");

interface CustomRequest extends Request {
  session: Session & { userId?: string }; // Add the userId property to the session type
}

// GET api/users/session
export const getSession = async (
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    if (req.session.userId) {
      // Om en användare är inloggad, hämta deras session
      const user = await UserModel.findById(req.session.userId);

      if (user) {
        // Skickar sessions-informationen om den hittas
        res.send({ user });
      } else {
        res.status(404).send("User not found");
      }
    } else {
      // Om ingen session hittas, så returnerar error.
      res.status(401).send("No active session");
    }
    res.status(201).send({ message: "User session restored" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
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
  req: CustomRequest,
  res: Response
): Promise<void> => {
  try {
    // Hämtar information från form
    const { email, password } = req.body;

    // Kontrollerar om user finns i databasen
    const user = await UserModel.findOne({ email });

    // Kontrollerar om lösenord är korrekt, eller om ingen användare finns. Returnerar error
    if (!user || !(await argon2.verify(user.password, password))) {
      res.status(401).send("Invalid email or password");
      return;
    }
    req.session.userId = user._id;
    res.status(201).send({ message: "User logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }

  res.status(201).send({ message: "User logged in successfully" });
};

// DELETE api/users/logout
export const logoutUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    req.session.destroy((err: any) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      res.status(201).send({ message: "User logged out succesfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
