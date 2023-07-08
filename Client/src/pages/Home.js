import { useContext, useEffect } from "react";
import USER_AUTH from "../services/user-auth-api";
import { profileContext } from "../context/myContext";
import { FaApple, FaMicrosoft, FaSpotify, FaAmazon } from "react-icons/fa";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { profile, setProfile } = useContext(profileContext);
  const token = localStorage.getItem("TALENT_BOX_TOKEN");
  

  const getUser = async () => {
    const result = await USER_AUTH(token);
    console.log(result);
    if (result.status === 200) {
      setProfile(result.data.user);
      console.log(result.data.user);
    }
  };
  useEffect(() => {
    if (token) {
      getUser();
    }
  }, [token]);
  const redirect = useNavigate();
  const handleClick = () => {
    if (Object.keys(profile).length > 0) {
      redirect("/question");
    } else {
      redirect("/register");
    }
  };
  return (
    <div id="home-div">
      <div className="home-top-div">
        <h3>Skygoaltech Assignment</h3>
        <p>Given By Bhavana Mam</p>
        <h3>Thank You </h3>
      </div>
    
      <Button buttonText="Let's Login First" onClick={handleClick} />
    </div>
  );
};
export default Home;
