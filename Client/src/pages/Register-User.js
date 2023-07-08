import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { REGISTER_USER } from "../services/user-api";
import { useNavigate } from "react-router-dom";
const initObj = {
  name: "",
  email: "",
  password: "",
};
const Register = () => {
  const [input, setInput] = useState(initObj);
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Select file");
  // input submit
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  // file submit
  const handleFileInput = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  // make form
  const formData = new FormData();
  formData.append("userImage", file);
  formData.append("user", JSON.stringify(input));
  // on Form submit
  const redirect = useNavigate();
  const regrex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";
  const { name, email, password } = input;
  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      return alert("Please fill all the details...");
    } else if (password.length <= 4) {
      return alert("Password should be greater than 4 digits..");
    } else if (regrex.match(email)) {
      return alert("Email format not correct");
    }
    const result = await REGISTER_USER(formData);
    console.log(Object.fromEntries(formData));
    if (result.status === 200) {
      alert(`Thanks for creating account ${name}`);
      redirect("/login");
    } else {
      alert(result.response.data.message);
    }
  };

  return (
    <div id="form">
      <form onSubmit={onFormSubmit}>
        <p>Registration Form</p>
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          handleChange={handleChange}
        />
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

        <div className="upload-btn-wrapper">
          <Button className="upload-btn" buttonText="Choose file" />
          <Input
            type="file"
            handleChange={handleFileInput}
            name="userImage"
            className="upload-btn"
          />
          <span className="file-name">{fileName}</span>
        </div>
        <Input type="submit" value="Register" />
      </form>
      <p>
        If Already have an Account Click{" "}
        <span className="login-span" onClick={() => redirect("/login")}>
          Here
        </span>{" "}
      </p>
     
    </div>
  );
};
export default Register;
