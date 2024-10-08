import React, { useState, useEffect, useContext } from 'react';
import { AppCourseContext } from './App.jsx';

export default function SchoolCatalog() {
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState(null);
  const [direction, setDirection] = useState('asc');
  const [page, setPage] = useState(1);
  const { enrolled, enroll } = useContext(AppCourseContext);

  useEffect(() => {
    fetch('/api/courses.json')
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(err => console.error('Error fetching data: ', err));
  }, []);

  const handleSort = (col) => {
    const newDirection = sort === col && direction === 'asc' ? 'desc' : 'asc';
    setSort(col);
    setDirection(newDirection);
  };

  const filteredCourses = courses.filter((course) =>
    course.courseNumber.toLowerCase().includes(filter.toLowerCase()) ||
    course.courseName.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sort) {
      const valA = a[sort];
      const valB = b[sort];

      if (valA < valB) return direction === 'asc' ? -1 : 1;
      if (valA > valB) return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const currentPage = sortedCourses.slice((page - 1) * 5, page * 5);
  const hasMore = sortedCourses.length > page * 5;
  const hasLess = page > 1;

  const isEnrolled = (courseNumber) => {
    return enrolled.some(course => course.courseNumber === courseNumber);
  };

  return (
    <div className="school-catalog">
      <h1>School Catalog</h1>
      <input
        type="text"
        placeholder="Search"
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setPage(1); // Reset to first page on search
        }}
      />
      <table>
        <thead>
          <tr>
            <th className={sort === 'trimester' ? 'selected' : ''} onClick={() => handleSort('trimester')}>Trimester</th>
            <th className={sort === 'courseNumber' ? 'selected' : ''} onClick={() => handleSort('courseNumber')}>Course Number</th>
            <th className={sort === 'courseName' ? 'selected' : ''} onClick={() => handleSort('courseName')}>Course Name</th>
            <th className={sort === 'semesterCredits' ? 'selected' : ''} onClick={() => handleSort('semesterCredits')}>Semester Credits</th>
            <th className={sort === 'totalClockHours' ? 'selected' : ''} onClick={() => handleSort('totalClockHours')}>Total Clock Hours</th>
            <th>Enroll</th>
          </tr>
        </thead>
        <tbody>
          {filteredCourses.length > 0 ? (
            currentPage.map((course, index) => (
              <tr key={index}>
                <td>{course.trimester}</td>
                <td>{course.courseNumber}</td>
                <td>{course.courseName}</td>
                <td>{course.semesterCredits}</td>
                <td>{course.totalClockHours}</td>
                <td>
                  {isEnrolled(course.courseNumber) ? (
                    <button disabled>Enroll</button>
                  ) : (
                    <button onClick={() => enroll(course)}>Enroll</button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No courses found</td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={!hasLess} onClick={() => setPage(page - 1)}>Previous</button>
        <button disabled={!hasMore} onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
