"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodo = exports.getTodos = exports.createTodo = void 0;
const TODOS = [];
exports.createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = {
        id: Math.random().toString(),
        text: text,
    };
    TODOS.push(newTodo);
    res.status(201).json({ message: "Todo created.", todo: newTodo });
};
exports.getTodos = (req, res, next) => {
    res.status(200).json({ todos: TODOS });
};
exports.getTodo = (req, res, next) => {
    const id = req.params.id;
    const theTodo = TODOS.findIndex((item) => item.id === id);
    if (theTodo < 0) {
        throw new Error("Cannot find the todo");
    }
    res.status(200).json({ todo: TODOS[theTodo] });
};
exports.updateTodo = (req, res, next) => {
    const text = req.body.text;
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
exports.deleteTodo = (req, res, next) => {
    const id = req.params.id;
    const theTodo = TODOS.findIndex((item) => item.id === id);
    if (theTodo < 0) {
        throw new Error("Cannot find the todo");
    }
    TODOS.splice(theTodo, 1);
    res.json({ message: "Successfully deleted." });
};
