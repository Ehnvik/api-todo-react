import { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { ITodoContext } from "../../App";

export const LoginUser = () => {
  const { loginDetails, handleUserLoginInput, handleSubmitUserLogin } =
    useOutletContext<ITodoContext>();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleUserLoginInput(e);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitUserLogin();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            name="username"
            id="username"
            value={loginDetails.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={loginDetails.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account?</p>
      <li>
        Create one{" "}
        <Link to={"/createAccount"}>
          <strong>here</strong>
        </Link>
      </li>
    </div>
  );
};
