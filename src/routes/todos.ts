import { Router } from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
  getTodo,
} from "../controllers/todos";

const router = Router();

router.post("/", createTodo);

router.get("/", getTodos);

router.get("/:id", getTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

export default router;
