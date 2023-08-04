import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../errors/not-found";
import { Todos } from "../api/todos/todos.model";
import { TypedRequest } from "./typed-request.interface";
import { CustomError } from "../errors";

export const loginValidator = (type: "two" | "one" = "two") => {
  return async (
    req: TypedRequest<any, any, any>,
    res: Response,
    next: NextFunction
  ) => {
    const userId = req.user!.id;
    const todoId = req.params.id;

    const q: any = {
      createdBy: userId,
    };

    if (type === "two") {
      q.$or = [{ assignedTo: userId }, { _id: todoId }];
    } else {
      q._id = todoId;
    }

    try {
      const todo = await Todos.findOne(q);

      if (todo) {
        next();
      } else {
        res.status(404);
        res.send("You cannot edit this Todo or this Todo does not exist.");
      }
    } catch (err) {
      next(err);
    }
  };
};
