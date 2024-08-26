import React, { useState, useEffect } from 'react';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState(null);
  const [direction, setDirection] = useState('asc');

  useEffect(() => {
    fetch('/api/courses.json')
    .then(response => response.json())
    .then(data => setCourses(data))
    .catch(err => console.error('Error fetching data: ', err));
  }, []);

  // Determines if the column is being sorted in ascending or descending order
  const handleSort = (col) => {
    const newDirection = sort === col && direction === 'asc' ? 'desc' : 'asc';
    // Updates states accordingly
    setSort(col);
    setDirection(newDirection);
  };

  const sortedCourses = [...courses].sort((a, b) => {
    if (sort) {
      const valA = a[sort];
      const valB = b[sort];
    
      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
    }
    return 0;
  })
  const filteredData = sortedCourses.filter((course) => 
    course.courseNumber.toLowerCase().includes(filter.toLowerCase()) ||
    course.courseName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input type="text" placeholder="Search" value={filter} onChange={(e) => setFilter(e.target.value)} />
      <table>
        <thead>
          <tr>
            <th onClick={(() => handleSort('trimester'))}>Trimester</th>
            <th onClick={(() => handleSort('courseNumber'))}>Course Number</th>
            <th onClick={(() => handleSort('courseName'))}>Course Name</th>
            <th onClick={(() => handleSort('semesterCredits'))}>Semester Credits</th>
            <th onClick={(() => handleSort('totalClockHours'))}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {courses.length > 0 ? (
            filteredData.map((course, index) => (
              <tr key={index}>
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
