import logo from "./assets/logo.png";
import React, { useContext } from 'react';
import { AppCourseContext } from "./App";

export default function Header() {
  const { enrolled } = useContext(AppCourseContext);
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="enrollment">Classes Enrolled: {enrolled.length}</div>
    </div>
  );
}
