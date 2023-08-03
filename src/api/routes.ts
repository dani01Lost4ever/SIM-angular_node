import { Router } from "express";
import userRouter from "./users/user.router";
import authRouter from "./auth/auth.router";
import todosRouter from "./todos/todos.router";
const router = Router();

router.use("/users", userRouter);
router.use("/todos", todosRouter);
router.use(authRouter);

export default router;
