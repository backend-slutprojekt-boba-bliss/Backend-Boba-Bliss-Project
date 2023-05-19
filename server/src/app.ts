import express, {
  NextFunction,
  Request,
  Response,
} from "express";
import "express-async-errors";

export const app = express();
app.use(express.json());

app.use(
  (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    res.sendStatus(500);
    console.error(err);
  }
);
