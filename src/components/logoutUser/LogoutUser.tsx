import { useNavigate } from "react-router";
import { ITodoContext } from "../../App";
import { useOutletContext } from "react-router-dom";

export const LogoutUser = () => {
  const { handleLogutUser, removeSessionStorageItems } =
    useOutletContext<ITodoContext>();
  const navigate = useNavigate();
  const handleNoClick = () => {
    navigate("/");
  };

  const handleYesClick = () => {
    alert("You have been logget out.");
    handleLogutUser(false);
    removeSessionStorageItems();
    handleNoClick();
  };

  return (
    <div>
      <h3>Do you want to log out?</h3>
      <button onClick={handleYesClick}>Yes</button>
      <button onClick={handleNoClick}>No</button>
    </div>
  );
};
