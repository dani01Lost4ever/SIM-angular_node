import { Router } from "express";
import { validate } from "../../utils/validation.middleware";
import passport from "passport";
import { isAuthenticated } from "../../utils/auth/authenticated.middleware";
import { AddTodosDTO, SetComplete } from "./todos.dto";
import { add, list, setComplete, setUncomplete } from "./todos.controller";

const router = Router();

router.use(isAuthenticated);
router.get("/", list);
router.post("/", validate(AddTodosDTO, "body"), add);
router.patch("/:id/check", validate(SetComplete, "params"), setComplete);
router.patch("/:id/uncheck", validate(SetComplete, "params"), setUncomplete);

export default router;
