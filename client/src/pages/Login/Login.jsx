import React, { useState } from "react";

import { toast } from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import AuthButton from "../../components/AuthButton/AuthButton";
import googleIcon from "../../img/google.ico";
import logo from "../../img/png/logo.png";
import axios from "../../utils/axiosInstance";
import "./login.css";

const Login = ({ isUserClient, isLogin, setIsClient, isClient }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (loginData.username && loginData.password) {
        const res = await axios.post("/api/v1/auth/login", loginData);

        if (res.data.isLogin) {
          localStorage.setItem("isLogin", true);
          localStorage.setItem("userId", res.data.user._id);
          window.location.href = "/";
          setLoginData({
            username: "",
            password: "",
          });
          localStorage.setItem("userId", res.data.user._id);
          toast.success("Login Success", {
            style: {
              padding: "16px",
              animationDuration: "2s",
            },
          });
          window.location.href = "/";
          setLoginData({
            username: "",
            password: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        style: {
          padding: "16px",
          animationDuration: "2s",
        },
      });
      
      setLoginData({
        username: "",
        password: "",
      });
    }
  };

  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:5000/auth/github", "_self");
  };

  return !isLogin ? (
    <>
      <div className="registerContainer loginContainer">
        <div className="registerLeftContainer ">
          <h1 className="formHeading">Login into Flexwork</h1>
          <img className="loginLogo" src={logo} alt="flexwork" />
          <AuthButton
            icon={
              <img
                src={googleIcon}
                style={{ width: "17px" }}
                alt="google"
              ></img>
            }
            bg={"white"}
            color={"grey"}
            title={"Sign in with google"}
            provider={google}
          ></AuthButton>
          <AuthButton
            icon={<FaGithub style={{ fontSize: "20px" }}></FaGithub>}
            bg={"#23282c"}
            color={"white"}
            title={"Sign in with Github"}
            provider={github}
          ></AuthButton>
        </div>

        <form
          className="registerRightContainer loginForm"
          onSubmit={handleSubmit}
        >
          <input
            className="registerInput"
            type="text"
            required
            value={loginData.username}
            onChange={(e) =>
              setLoginData({ ...loginData, username: e.target.value })
            }
            placeholder="Username or Email"
          ></input>
          <input
            value={loginData.password}
            className="registerInput"
            required
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            type="password"
            placeholder="Password"
          ></input>
          <button type="submit" className="registerBtn">
            Login
          </button>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="registerBtn"
            style={{ marginTop: "10px" }}
          >
            Register
          </button>
        </form>
      </div>
    </>
  ) : isUserClient ? (
    <Navigate to={"/client"}></Navigate>
  ) : (
    <Navigate to={"/freelancer"}></Navigate>
  );
};

export default Login;
