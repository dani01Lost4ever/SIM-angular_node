import { Request, Response, NextFunction } from "express";
import { TypedRequest } from "../../utils/typed-request.interface";
import todosService from "./todos.service";
import {
  AddTodosDTO,
  AssignDTOBody,
  AssignDTOParam,
  ListValidate,
  SetComplete,
} from "./todos.dto";
import { Todo } from "./todos.entity";

export const list = async (
  req: TypedRequest<any, ListValidate, any>,
  res: Response,
  next: NextFunction
) => {
  const user = req.user!;
  const checkCompleted = req.query.showCompleted;
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
    console.log(updated);
    res.json(updated);
  } catch (err: any) {
    next(err);
  }
};
