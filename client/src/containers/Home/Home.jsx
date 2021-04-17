import React from "react";
import { Jumbotron } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Home.css";

const Home = () => {
  const fixed = "bottom";
  const navbarpos = "navbarBorderTop";
  return (
    <>
      <Jumbotron className="jumbotron">
        <h1>Welcome to Lekha Likhi!</h1>
        <p className="h6">Know. Share. Grow.</p>
        <hr />
        <p className="text1">
          Hi! My name is Sanket Sarkar. I am a web developer, based on Kolkata,
          India, who loves to learn, read, and think critically on any "think
          worthy" subject. Moreover, I like to share my views and understandings
          on topics which I find intriguing and see if others find them
          interesting!
        </p>
        <p className="text1">
          So here I am, with my very own blogging website where I'll share my
          views and study on various topics ranging from computer science to
          literature, from psycholgy to physics, from cinema to history and so
          on...
        </p>
        <br />
        <p className="text1">
          P.S. I may frequently switch my language between English, Bengali,
          Hindi and even Spanish. ;)
          <br /> E.g. "Lekha Likhi" is a Bengali term for "Writings".
        </p>
        <br />
        <br />
        <NavLink to={"/blogs"} className="navLink">
          Check out my blogs!
        </NavLink>
      </Jumbotron>
      <Header fixed={fixed} navbarpos={navbarpos}/>
    </>
  );
};

export default Home;
