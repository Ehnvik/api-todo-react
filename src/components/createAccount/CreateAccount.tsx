import { ChangeEvent, FormEvent, useState } from "react";
import { IAccountDetails } from "../../models/IAccountDetails";
import { registerUser } from "../../services/userService";

export const CreateAccount = () => {
  const [createUser, setCreateUser] = useState<IAccountDetails>({
    username: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newUser = { ...createUser, [e.target.name]: e.target.value };
    setCreateUser(newUser);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const newUser = await registerUser(createUser);
    console.log(newUser);
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
            value={createUser.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={createUser.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
};
