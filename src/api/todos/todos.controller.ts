import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import { NotFoundError } from "../../errors/not-found";
import todosService from "./todos.service";
import {
  AddTodosDTO,
  AssignDTOBody,
  AssignDTOParam,
  SetComplete,
} from "./todos.dto";
import { Todo } from "./todos.entity";

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user!;
  const checkCompleted = req.query.showCompleted == "true" ? true : false;
  const list = await todosService.find(user.id!, checkCompleted);
  res.json(list);
};

export const add = async (
  req: TypedRequest<AddTodosDTO>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user!;
    const { title, dueDate, assignedTo } = req.body;

    const newTodo: Todo = {
      title,
      dueDate,
      assignedTo,
    };
    const saved = await todosService.add(newTodo, user.id!);
    res.json(saved);
  } catch (err) {
    next(err);
  }
};

export const setComplete = async (
  req: TypedRequest<any, any, SetComplete>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const updated = await todosService.update(id, { completed: true });
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

export const setUncomplete = async (
  req: TypedRequest<any, any, SetComplete>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;

  try {
    const updated = await todosService.update(id, { completed: false });
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};

export const assignTo = async (
  req: TypedRequest<AssignDTOBody, any, AssignDTOParam>,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const assignedToUser = req.body.userId;

    const updated = await todosService.update(id, {
      assignedTo: assignedToUser,
    });
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};
