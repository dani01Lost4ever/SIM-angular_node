import { NextFunction, Response } from "express";
import { TypedRequest } from "./typed-request.interface";
import { User } from "../api/users/user.model";

export const assignedToValidator = () => {
  return async (
    req: TypedRequest<any, any, any>,
    res: Response,
    next: NextFunction
  ) => {
    const todoAssign = req.body.assignedTo;
    console.log("ID:", todoAssign);

    try {
      const todoUser = await User.findById(todoAssign);

      if (todoUser) {
        next();
      } else {
        res.status(404);
        res.send("The assigned user does not exist");
      }
    } catch (err) {
      next(err);
    }
  };
};
