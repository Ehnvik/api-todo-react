import { ChangeEvent, useState } from "react";
import { ITodo } from "../../models/ITodo";
import { TodosWrapper } from "../../styled/Wrappers";
import { ITodoContext } from "../../App";
import { Link, useOutletContext } from "react-router-dom";
import { deleteTodo, updateTodo } from "../../services/todoService";
import moment from "moment";
import { IEditTodo } from "../../models/IEditTodo";

let editedTodo: IEditTodo = {
  todo: "",
  isDone: false,
  created: new Date(),
};

export const Todos = () => {
  const {
    todos,
    newTodo,
    isLoggedIn,
    changeTodo,
    createNewTodo,
    handleTodoSubmit,
    handleDeleteTodo,
  } = useOutletContext<ITodoContext>();

  const [editable, setEditable] = useState<{ [key: number]: boolean }>({});

  const handleNewTodoChange = (e: ChangeEvent<HTMLInputElement>) => {
    createNewTodo(e);
  };

  const handleEditButton = (todo: ITodo, condition: boolean) => {
    setEditable((prev) => ({ ...prev, [todo.id]: condition }));
    if (condition === false) {
      updateTodo(
        todo.id,
        (editedTodo = {
          todo: todo.todo,
          isDone: todo.isDone,
          created: new Date(),
        })
      );
    } else {
      return;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, todo: ITodo) => {
    changeTodo(e, todo);
  };

  const handleDelete = (todo: ITodo) => {
    handleDeleteTodo(todo);
    deleteTodo(todo.id);
  };

  const showTodos = todos.map((todo: ITodo) => {
    return (
      <ul key={todo.id}>
        <li>
          <span>
            <input
              type="text"
              name={todo.id.toString()}
              value={todo.todo}
              disabled={!editable[todo.id]}
              onChange={(e) => {
                handleChange(e, todo);
              }}
            />
          </span>
          {editable[todo.id] ? (
            <button
              onClick={() => {
                handleEditButton(todo, false);
              }}>
              Save
            </button>
          ) : (
            <button
              onClick={() => {
                handleEditButton(todo, true);
              }}>
              Edit
            </button>
          )}
          <button
            onClick={() => {
              handleDelete(todo);
            }}>
            Delete
          </button>

          <div>{moment(todo.created).format("YYYY-MM-DD k:mm")}</div>
        </li>
      </ul>
    );
  });

  if (isLoggedIn) {
    return (
      <TodosWrapper>
        <form onSubmit={handleTodoSubmit}>
          <input
            type="text"
            id="newTodo"
            value={newTodo.todo}
            onChange={handleNewTodoChange}
          />
          <button>Add</button>
        </form>
        {showTodos}
      </TodosWrapper>
    );
  } else {
    return (
      <div>
        <h3>Login or create an account to view your todos</h3>
        <li>
          Login{" "}
          <Link to={"/login"}>
            <strong>here</strong>
          </Link>
        </li>
      </div>
    );
  }
};
