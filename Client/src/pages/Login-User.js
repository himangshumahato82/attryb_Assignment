import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { LOGIN_USER } from "../services/user-api";
import { useNavigate } from "react-router-dom";
const initObj = {
  email: "",
  password: "",
};
const Login = () => {
  const [loginInput, setLoginInput] = useState(initObj);

  // input submit
  const handleChange = (e) => {
    setLoginInput({
      ...loginInput,
      [e.target.name]: e.target.value,
    });
  };

  // on Form submit
  const redirect = useNavigate();
  const regrex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
  const { email, password } = loginInput;
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("Please fill all the details...");
    } else if (password.length <= 4) {
      return alert("Password should be greater than 4 digits..");
    } else if (regrex.match(email)) {
      return alert("Email format not correct");
    }
    const result = await LOGIN_USER(loginInput);
    if (result.status === 200) {
            console.log(result.data.Token)
      localStorage.setItem("TALENT_BOX_TOKEN", result.data.Token);
      alert("Log in successfull....");
      redirect("/home");
    } else {
      alert(result.response.data.message);
    }
  };
  return (
    <div id="form">
      <form onSubmit={onFormSubmit}>
        <h1>LogIn Form</h1>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          handleChange={handleChange}
          required
        />

        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          handleChange={handleChange}
          required
        />

        <Input type="submit" value="Register" />
      </form>
      
    </div>
  );
};
export default Login;
