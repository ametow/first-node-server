import { RequestHandler } from "express";
import { Todo } from "../models/todo";

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const newTodo: Todo = {
    id: Math.random().toString(),
    text: text,
  };

  TODOS.push(newTodo);

  res.status(201).json({ message: "Todo created.", todo: newTodo });
};

export const getTodos: RequestHandler = (req, res, next) => {
  res.status(200).json({ todos: TODOS });
};

export const getTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const theTodo = TODOS.findIndex((item) => item.id === id);
  if (theTodo < 0) {
    throw new Error("Cannot find the todo");
  }
  res.status(200).json({ todo: TODOS[theTodo] });
};

export const updateTodo: RequestHandler<{ id: string }> = (req, res, next) => {
  const text = (req.body as { text: string }).text;
  const id = req.params.id;
  const theTodo = TODOS.findIndex((item) => item.id === id);
  if (theTodo < 0) {
    throw new Error("Cannot find the todo");
  }
  const oldTodo = TODOS[theTodo];
  TODOS[theTodo] = { id: oldTodo.id, text: text };

  res
    .status(201)
    .json({ message: "Successfully updated.", todo: TODOS[theTodo] });
};

export const deleteTodo: RequestHandler = (req, res, next) => {
  const id = req.params.id;
  const theTodo = TODOS.findIndex((item) => item.id === id);
  if (theTodo < 0) {
    throw new Error("Cannot find the todo");
  }
  TODOS.splice(theTodo, 1);
  res.json({ message: "Successfully deleted." });
};
