import React, { useState, useEffect } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    fetch('/api/courses.json')
    .then(response => response.json())
    .then(data => setCourses(data))
    .catch(err => console.error('Error fetching data: ', err));
  }, []);

  const filteredData = courses.filter((course) => 
    course.courseNumber.toLowerCase().includes(filter.toLowerCase()) ||
    course.courseName.toLocaleLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th>Trimester</th>
            <th>Course Number</th>
            <th>Courses Name</th>
            <th>Semester Credits</th>
            <th>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            filteredData.map((course) => (
              <tr>
              <td>{course.trimester}</td>
              <td>{course.courseNumber}</td>
              <td>{course.courseName}</td>
              <td>{course.semesterCredits}</td>
              <td>{course.totalClockHours}</td>
              <td><button>Enroll</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='6'>Loading courses...</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button>Previous</button>
        <button>Next</button>
      </div>
    </div>
  );
}
