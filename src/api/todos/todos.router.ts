import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import passport from "passport";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import {
  AddTodosDTO,
  AssignDTOBody,
  AssignDTOParam,
  ListValidate,
  SetComplete,
} from "./todos.dto";
import {
  add,
  assignTo,
  list,
  setComplete,
  setUncomplete,
} from "./todos.controller";
import { loginValidator } from "../../utils/loginValidator.middleware";

const router = Router();

router.use(isAuthenticated);

router.get("/", validate(ListValidate, "query"), list);

router.post("/", validate(AddTodosDTO, "body"), add);

router.patch(
  "/:id/check",
  loginValidator("two"),
  validate(SetComplete, "params"),
  setComplete
);

router.patch(
  "/:id/uncheck",
  loginValidator("two"),
  validate(SetComplete, "params"),
  setUncomplete
);

router.post(
  "/:id/assignTo",
  loginValidator("one"),
  validate(AssignDTOBody, "body"),
  validate(AssignDTOParam, "params"),
  assignTo
);

export default router;
