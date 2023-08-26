import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import clientImg from "../../img/clientRegister.jpg";
import freelancerImg from "../../img/freelancerRegister.webp";
import "./registerOption.css";
import { Flex } from "@chakra-ui/react";
import logo from "../../img/png/logo.png";

const RegisterOption = ({ isUserClient, isLogin, setIsClient, isClient }) => {
  const navigate = useNavigate();

  return !isLogin ? (
    <>
      <Flex align={"center"} justify={"center"}>
        <img className="loginLogo" width={"30%"} src={logo} alt="flexwork" />
      </Flex>

      <Flex align={"center"} justify={"center"}>
        <div className=" optionContainer">
          <div
            className="radioBox"
            style={{ cursor: "pointer" }}
            onClick={(e) => setIsClient(false)}
          >
            <input
              type="radio"
              name="role"
              checked={isClient ? false : true}
              defaultChecked
              onChange={(e) => setIsClient(false)}
              className="radioInput"
              value={"client"}
            />
            <label className="radioLabel">Looking for a work ?</label>

            <img
              className="optionImg"
              src={freelancerImg}
              alt="freelancer"
            ></img>
          </div>

          <div
            className="radioBox"
            onClick={(e) => setIsClient(true)}
            style={{ cursor: "pointer" }}
          >
            <input
              type="radio"
              checked={isClient ? true : false}
              name="role"
              className="radioInput"
              onChange={(e) => {
                setIsClient(true);
              }}
              value={"client"}
            />

            <label className="radioLabel">Looking to Hire ?</label>

            <img className="optionImg" src={clientImg} alt="freelancer"></img>
          </div>
          <button
            className="optionBtn"
            onClick={() => {
              if (isClient) {
                navigate("/register/client");
                setIsClient(false);
              } else {
                navigate("/register/freelancer");
                setIsClient(false);
              }
            }}
          >
            Join
          </button>
        </div>
      </Flex>
    </>
  ) : isUserClient ? (
    <Navigate to={"/client"}></Navigate>
  ) : (
    <Navigate to={"/freelancer"}></Navigate>
  );
};

export default RegisterOption;
