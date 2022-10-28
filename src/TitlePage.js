import "./TitlePage.css";
import styled from "styled-components";
import React from "react";
import { Link } from "react-router-dom";

const CourseContent = styled.div`
  text-align: center;
  button {
    background-color: black;
    color: #fff;
    border-radius: 25px;
    padding: 10px;
    border: 1px solid transparent;
  }
`;

function Title() {
  return (
    <div className="App">
      <h1 className="App-header">
        Course Name: Promoting patient safety through effective communication
        and teamwork
      </h1>
      <main className="App-content">
        <CourseContent>
          <h2>This course will take 60 minutes to complete</h2>
          
          <Link to="/intro"><button>Click to continue...</button></Link>
        </CourseContent>
      </main>
    </div>
  );
}

export default Title;
