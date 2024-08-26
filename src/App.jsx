import SchoolCatalog from "./SchoolCatalog";
import Header from "./Header";
import ClassSchedule from "./ClassSchedule";
import { createContext, useState, useEffect } from "react";

export const AppCourseContext = createContext();

export default function App() {
  const [enrolled, setEnrolled] = useState([]);

  const enroll = (course) => {
    console.log('Enrolling course: ', course);
  setEnrolled([...enrolled, course]);
  console.log('Enrolled courses after update: ', enrolled);
  };

  const drop = (courseNumber) => {
    setEnrolled(enrolled.filter(course => course.courseNumber !== courseNumber));
  };

  useEffect(() => {
    console.log("Enrolled courses updated:", enrolled);
  }, [enrolled]);

  return (
    <div>
      <AppCourseContext.Provider value={{ enrolled, enroll, drop }}>
        <Header />
        <SchoolCatalog />
        <ClassSchedule />
      </AppCourseContext.Provider>
    </div>
  );
}
