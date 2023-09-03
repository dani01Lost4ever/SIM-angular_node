import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import {
  AddTodosDTO,
  AssignBodyDTO,
  AssignParamDTO,
  ListValidateDTO,
  SetCompleteDTO,
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

router.get("/", validate(ListValidateDTO, "query"), list);

router.post("/", validate(AddTodosDTO, "body"), add);

router.patch(
  "/:id/check",
  loginValidator("two"),
  validate(SetCompleteDTO, "params"),
  setComplete
);

router.patch(
  "/:id/uncheck",
  loginValidator("two"),
  validate(SetCompleteDTO, "params"),
  setUncomplete
);

router.post(
  "/:id/assignTo",
  loginValidator("one"),
  validate(AssignBodyDTO, "body"),
  validate(AssignParamDTO, "params"),
  assignTo
);

export default router;
