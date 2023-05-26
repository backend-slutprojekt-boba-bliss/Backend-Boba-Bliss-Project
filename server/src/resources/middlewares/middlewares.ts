import { NextFunction, Request, Response } from "express";


export function isLoggedin(req: Request, res: Response, next: NextFunction) {
    if (!req.session || !req.session.user) {
        res.status(401).json({ error: "You must log in to do this!" });
        return;
      }
    next();
}


export function isAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.session?.user.isAdmin === false) {
      res.status(401).json("You must be admin to do this!");
      return;
    }
    next();
  }