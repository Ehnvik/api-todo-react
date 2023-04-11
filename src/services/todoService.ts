import { IEditTodo } from "../models/IEditTodo";
import { INewTodo } from "../models/INewTodo";
import api from "./userService";

export const getTodos = async () => {
  const response = await api.get("/todos");
  return response.data;
};

export const createTodo = async (newTodo: INewTodo) => {
  const response = await api.post("/todos/create", newTodo);
  console.log(newTodo);

  return response.data;
};

export const deleteTodo = async (id: number) => {
  const response = await api.delete(`/todos/delete/${id}`);

  return response.data;
};

export const updateTodo = async (id: number, editedTodo: IEditTodo) => {
  const response = await api.put(`/todos/update/${id}`, editedTodo);

  return response.data;
};
