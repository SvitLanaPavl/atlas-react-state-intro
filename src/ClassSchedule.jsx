import { AppCourseContext } from "./App";
import React, { useContext } from 'react';

export default function ClassSchedule() {
  const { enrolled, drop } = useContext(AppCourseContext);

  return (
    <div className="class-schedule">
      <h1>Class Schedule</h1>
      <table>
        <thead>
          <tr>
            <th>Course Number</th>
            <th>Course Name</th>
            <th>Drop</th>
          </tr>
        </thead>
        <tbody>
        {enrolled.map((course) => (
              <tr key={course.courseNumber}>
                  <td>{course.courseNumber}</td>
                  <td>{course.courseName}</td>
                  <td>
                    <button onClick={() => drop(course.courseNumber)}>Drop</button>
                  </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
