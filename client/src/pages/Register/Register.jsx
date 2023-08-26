import React, { useState } from "react";
import logo from "../../img/png/logo.png";
import "./register.css";

import { FaGithub } from "react-icons/fa";
import AuthButton from "../../components/AuthButton/AuthButton";
import googleIcon from "../../img/google.ico";
import axios from "../../utils/axiosInstance";
import { Navigate, useNavigate } from "react-router-dom";

import { toast } from "react-hot-toast";

const Register = ({ isUserClient, isLogin, title }) => {
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    state: "",
    city: "",
    isClient: false,
    password: "",
    confirmpassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      registerData.firstName &&
      registerData.lastName &&
      registerData.username &&
      registerData.email &&
      registerData.state &&
      registerData.city &&
      registerData.password &&
      registerData.confirmpassword
    ) {
      try {
        if (window.location.href.includes("client")) {
          registerData.isClient = true;
        }
        if (window.location.href.includes("freelancer")) {
          registerData.isClient = false;
        }

        const res = await axios.post("/api/v1/auth/register", registerData, {
          headers: { "Content-Type": "application/json" },
        });

        if (res.data.isRegister) {
          toast.success("Registered Successfully!", {
            style: {
              padding: "16px",
              animationDuration: "2s",
            },
          });

          navigate("/login");
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message, {
          style: {
            padding: "16px",
            animationDuration: "2s",
          },
        });
      }
    }

    setRegisterData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      state: "",
      city: "",
      isClient: false,
      password: "",
      confirmpassword: "",
    });
  };

  const google = () => {
    window.open(
      `http://localhost:5000/auth/google?isClient=${window.location.href.includes(
        "/client"
      )}&isFirstTime=${window.location.href.includes("/register")}`,
      "_self"
    );
  };

  const github = () => {
    window.open(
      `http://localhost:5000/auth/github?isClient=${window.location.href.includes(
        "/client"
      )}&isFirstTime=${window.location.href.includes("/register")}`,
      "_self"
    );
  };

  return !isLogin ? (
    <>
      <div
        className="registerContainer"
        style={{ display: "flex", alignItems: "center", height: "100vh" }}
      >
        <div className="registerLeftContainer">
          <img src={logo} alt="logo" />
          <h1 className="formHeading" style={{ marginBottom: "20px" }}>
            Join as a {title}
          </h1>

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
            title={"Sign up with google"}
            provider={google}
          ></AuthButton>
          {/* <AuthButton
            icon={<FaLinkedin></FaLinkedin>}
            bg={"#0a66c2"}
            color={"white"}
            title={"Sign in with LinkedIn"}
            provider={linkedIn}
          ></AuthButton> */}
          <AuthButton
            icon={<FaGithub style={{ fontSize: "20px" }}></FaGithub>}
            bg={"#23282c"}
            color={"white"}
            title={"Sign up with Github"}
            provider={github}
          ></AuthButton>
        </div>
        <form className="registerRightContainer" onSubmit={handleSubmit}>
          <div className="mergeInput ">
            <input
              className="registerInput inputGap"
              type="text"
              value={registerData.firstName}
              required
              onChange={(e) =>
                setRegisterData({ ...registerData, firstName: e.target.value })
              }
              placeholder="First Name "
            ></input>
            <input
              className="registerInput inputGap "
              type="text"
              value={registerData.lastName}
              required
              onChange={(e) =>
                setRegisterData({ ...registerData, lastName: e.target.value })
              }
              placeholder="Last Name"
            ></input>
          </div>
          <input
            className="registerInput"
            type="text"
            required
            value={registerData.username}
            placeholder="Username"
            onChange={(e) =>
              setRegisterData({ ...registerData, username: e.target.value })
            }
          ></input>
          <input
            className="registerInput"
            type="email"
            required
            value={registerData.email}
            placeholder="Email"
            onChange={(e) =>
              setRegisterData({ ...registerData, email: e.target.value })
            }
          ></input>
          <div className="mergeInput">
            <input
              className="registerInput inputGap"
              type="text"
              value={registerData.state}
              required
              placeholder="State"
              onChange={(e) =>
                setRegisterData({ ...registerData, state: e.target.value })
              }
            ></input>
            <input
              className="registerInput inputGap"
              type="text"
              required
              value={registerData.city}
              onChange={(e) =>
                setRegisterData({ ...registerData, city: e.target.value })
              }
              placeholder="City"
            ></input>
          </div>
          <input
            value={registerData.password}
            className="registerInput"
            type="password"
            required
            onChange={(e) =>
              setRegisterData({ ...registerData, password: e.target.value })
            }
            placeholder="Password"
          ></input>
          <input
            className="registerInput"
            required
            value={registerData.confirmpassword}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                confirmpassword: e.target.value,
              })
            }
            type="password"
            placeholder="Confirm Password"
          ></input>
          <button className="registerBtn">Register</button>
        </form>
      </div>
    </>
  ) : isUserClient ? (
    <Navigate to={"/client"}></Navigate>
  ) : (
    <Navigate to={"/freelancer"}></Navigate>
  );
};

export default Register;
