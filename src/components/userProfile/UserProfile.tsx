import { useOutletContext } from "react-router-dom";
import { ITodoContext } from "../../App";

export const UserProfile = () => {
  const { isLoggedIn } = useOutletContext<ITodoContext>();

  if (isLoggedIn) {
    return <h3>Hello userProfile!</h3>;
  } else {
    return <h3>404 not found!</h3>;
  }
};
