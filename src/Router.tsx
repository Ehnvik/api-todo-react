import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import { StartPage } from "./components/startPage/StartPage";
import { LoginUser } from "./components/loginUser/LoginUser";
import { Todos } from "./components/todos/Todos";
import { LogoutUser } from "./components/logoutUser/LogoutUser";
import { UserProfile } from "./components/userProfile/UserProfile";
import { CreateAccount } from "./components/createAccount/CreateAccount";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <StartPage></StartPage>,
        index: true,
      },
      {
        path: "/login",
        element: <LoginUser></LoginUser>,
      },
      {
        path: "/logout",
        element: <LogoutUser></LogoutUser>,
      },
      {
        path: "/todos",
        element: <Todos></Todos>,
      },
      {
        path: "/profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/createAccount",
        element: <CreateAccount></CreateAccount>,
      },
    ],
  },
]);
