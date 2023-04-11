import { Link, useOutletContext } from "react-router-dom";
import { ITodoContext } from "../../App";

interface IHamburgerMenuProps {
  handleOpenMenu(status: boolean): void;
  open: boolean;
}

export const HamburgerMenu = (props: IHamburgerMenuProps) => {
  const handleClick = () => {
    props.handleOpenMenu(false);
  };

  const token = sessionStorage.getItem("token");
  return (
    <>
      <ul>
        <li>
          <Link to={"/"} onClick={handleClick}>
            Home
          </Link>
        </li>
        <li>
          <Link to={"/todos"} onClick={handleClick}>
            Todos
          </Link>
        </li>
        <li>
          {token === "" || token === null ? (
            <Link to={"/login"} onClick={handleClick}>
              Login
            </Link>
          ) : (
            <Link to={"/logout"} onClick={handleClick}>
              Logout
            </Link>
          )}
        </li>
        <li>
          {token === "" || token === null ? (
            ""
          ) : (
            <Link to={"/profile"} onClick={handleClick}>
              Profile
            </Link>
          )}
        </li>
      </ul>
    </>
  );
};
