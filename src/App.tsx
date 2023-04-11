import React, { ChangeEvent, useEffect, useState } from "react";
import "./App.css";

import { Outlet, useNavigate } from "react-router-dom";

import { Nav } from "./styled/Nav";
import { Header } from "./styled/Header";
import { HamburgerMenu } from "./components/hamburgerMenu/HamburgerMenu";
import { HamburgerWrapper } from "./styled/Wrappers";
import { HamburgerLogo } from "./components/hamburgerLogo/HamburgerLogo";
import { ITodo } from "./models/ITodo";
import { INewTodo } from "./models/INewTodo";
import { createTodo, getTodos } from "./services/todoService";
import { IAccountDetails } from "./models/IAccountDetails";
import { loginUser } from "./services/userService";
import { ILoginResponse } from "./models/ILoginResponse";

export interface ITodoContext {
  todos: ITodo[];
  newTodo: INewTodo;
  loginDetails: IAccountDetails;
  isLoggedIn: boolean;
  handleLogutUser(condition: boolean): void;
  changeTodo(e: ChangeEvent<HTMLInputElement>, t: ITodo): void;
  createNewTodo(e: ChangeEvent<HTMLInputElement>): void;
  handleDeleteTodo(todo: ITodo): void;
  handleTodoSubmit(e: React.FormEvent<HTMLFormElement>): void;
  handleUserLoginInput(e: ChangeEvent<HTMLInputElement>): void;
  handleSubmitUserLogin(): void;
  removeSessionStorageItems(): void;
}

function App() {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [newTodo, setNewTodo] = useState<INewTodo>({
    todo: "",
    isDone: false,
    created: new Date(),
    userId: id,
  });
  const [loginDetails, setloginDetails] = useState<IAccountDetails>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const getTodoList = async () => {
      let todos = await getTodos();
      setTodos(todos);
    };
    const storedId = sessionStorage.getItem("id");
    const loggedIn = sessionStorage.getItem("loggedIn");
    if (storedId) {
      setId(+storedId);
      setIsLoggedIn(Boolean(loggedIn));
    }
    if (isLoggedIn && todos.length === 0) {
      getTodoList();
    }
  }, [navigate, isLoggedIn]);

  const handleUserLoginInput = (e: ChangeEvent<HTMLInputElement>) => {
    let newloginDetails = { ...loginDetails, [e.target.name]: e.target.value };
    setloginDetails(newloginDetails);
  };

  const handleSubmitUserLogin = async () => {
    let response: ILoginResponse = await loginUser(loginDetails);

    if (response && response.token !== "") {
      setId(response.user.id);
      setIsLoggedIn(true);
      setSessionStorageItems(response);
      navigate(`/todos`);
    } else {
      alert("Username och password is invalid, please try again.");
    }
  };

  const handleLogutUser = (loggedOut: boolean) => {
    setIsLoggedIn(loggedOut);
    if (loggedOut === false) {
      setTodos([]);
    }
  };

  const changeTodo = (e: ChangeEvent<HTMLInputElement>, todo: ITodo) => {
    let updatedTodos = todos.map((t: ITodo) =>
      t.id === todo.id ? { ...t, todo: e.target.value } : t
    );
    setTodos(updatedTodos);
  };

  const createNewTodo = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTodo({
      ...newTodo,
      todo: e.target.value,
    });
  };

  const handleDeleteTodo = (todo: ITodo) => {
    const deletedTodoList = todos.filter((t: ITodo) => t.id !== todo.id);
    setTodos(deletedTodoList);
  };

  const handleTodoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newTodo.todo === "") {
      return;
    } else {
      const todoWithCorrectId = { ...newTodo, userId: id }; // create new object with updated userId
      const todoNew = {
        ...todos,
        id: 0,
        todo: newTodo.todo,
        isDone: newTodo.isDone,
        created: newTodo.created,
        userId: id,
      };
      setTodos([...todos, todoNew]);
      createTodo(todoWithCorrectId);
      setNewTodo({
        todo: "",
        isDone: false,
        created: new Date(),
        userId: id,
      });

      const searchInput = e.currentTarget.elements.namedItem(
        "newTodo"
      ) as HTMLInputElement;
      searchInput.value = "";
    }
  };

  const handleOpenMenu = (status: boolean) => {
    setOpen(status);
  };

  const removeSessionStorageItems = () => {
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
  };

  const setSessionStorageItems = (response: ILoginResponse) => {
    sessionStorage.setItem("token", response.token);
    sessionStorage.setItem("id", response.user.id.toString());
    sessionStorage.setItem("loggedIn", true.toString());
  };

  return (
    <>
      <Header>
        <Nav open={open}>
          <HamburgerMenu
            handleOpenMenu={handleOpenMenu}
            open={open}></HamburgerMenu>
        </Nav>
        <HamburgerWrapper>
          <HamburgerLogo handleOpenMenu={handleOpenMenu} open={open} />
        </HamburgerWrapper>
      </Header>

      <Outlet
        context={{
          todos,
          newTodo,
          loginDetails,
          isLoggedIn,
          handleLogutUser,
          createNewTodo,
          changeTodo,
          handleTodoSubmit,
          handleDeleteTodo,
          handleUserLoginInput,
          handleSubmitUserLogin,
          removeSessionStorageItems,
        }}></Outlet>
    </>
  );
}

export default App;
