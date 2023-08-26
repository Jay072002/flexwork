import React from "react";
import HomeBanner from "../../components/Home/HomeBanner/HomeBanner";
import HomeFeature from "../../components/Home/HomeFeature/HomeFeature";
import HomeService from "../../components/Home/HomeService/HomeService";
import HomeClientTestimonial from "../../components/Home/HomeClientTestimonial/HomeClientTestimonial";
import HomeGreateWork from "../../components/Home/HomeGreatWork/HomeGreatWork";
import { Navigate } from "react-router-dom";

const Home = ({ isLogin, isUserClient }) => {
  return !isLogin ? (
    <>
      <HomeBanner />
      <HomeFeature />
      <HomeService />
      <HomeClientTestimonial />
      <HomeGreateWork />
    </>
  ) : isUserClient ? (
    <Navigate to={"/client"}></Navigate>
  ) : (
    <Navigate to={"/freelancer"}></Navigate>
  );
};

export default Home;
