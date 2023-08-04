import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import passport from "passport";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import {
  AddTodosDTO,
  AssignDTOBody,
  AssignDTOParam,
  SetComplete,
} from "./todos.dto";
import {
  add,
  assignTo,
  list,
  setComplete,
  setUncomplete,
} from "./todos.controller";

const router = Router();

router.use(isAuthenticated);
router.get("/", list);
router.post("/", validate(AddTodosDTO, "body"), add);
router.patch("/:id/check", validate(SetComplete, "params"), setComplete);
router.patch("/:id/uncheck", validate(SetComplete, "params"), setUncomplete);
router.post(
  "/:id/assignTo",
  validate(AssignDTOParam, "params"),
  validate(AssignDTOBody, "body"),
  assignTo
);

export default router;
