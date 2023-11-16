// components/academic-pathway.js
import React from 'react';
import styles from '../styles/academic-pathway.module.css'; // Make sure the path is correct

const AcademicPathway = ({ courses }) => {
  const [dropdownVisible, setDropdownVisible] = useState(Array(5).fill(false));
  const mockCourses = ['Algebra', 'Biology', 'Chemistry', 'Data Science', 'Economics'];

  // If no courses are provided, create empty blocks to maintain layout
  const emptyBlocks = 5 - courses.length;
  const courseBlocks = [...courses, ...Array(emptyBlocks).fill({})];

  return (
    <div className={styles.academicPathway}>
      <div className={styles.pathwayHeader}>Academic Pathway</div>
      <div className={styles.coursesContainer}>
        {courseBlocks.map((course, index) => (
          <div key={index} className={styles.courseBlock}>
            {course.name ? (
              <>
                <div className={styles.courseName}>{course.name}</div>
                <div className={styles.courseTerm}>{course.term}</div>
              </>
            ) : (
              <div className={styles.courseName}></div> // Placeholder for empty blocks
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcademicPathway;


/*

const AcademicPathway = ({ courses }) => {
  const [dropdownVisible, setDropdownVisible] = useState(Array(5).fill(false));
  const mockCourses = ['Algebra', 'Biology', 'Chemistry', 'Data Science', 'Economics'];

  // If no courses are provided, create empty blocks to maintain layout
  const emptyBlocks = 5 - courses.length;
  const courseBlocks = [...courses, ...Array(emptyBlocks).fill({})];

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible.map((visible, i) => i === index ? !visible : visible));
  };

  const selectCourse = (course, index) => {
    console.log(`Course selected: ${course}`);
    // Add logic to update the selected course for a specific block
  };

  return (
    <div className={styles.academicPathway}>
      <div className={styles.pathwayHeader}>Academic Pathway</div>
      <div className={styles.coursesContainer}>
        {courseBlocks.map((course, index) => (
          <div key={index} className={styles.courseBlock} onClick={() => toggleDropdown(index)}>
            {course.name ? (
              <>
                <div className={styles.courseName}>{course.name}</div>
                <div className={styles.courseTerm}>{course.term}</div>
              </>
            ) : (
              <div className={styles.courseName}></div> // Placeholder for empty blocks
            )}
            {dropdownVisible[index] && (
              <div className="course-dropdown">
                {mockCourses.map((course, courseIndex) => (
                  <div
                    key={courseIndex}
                    className="dropdown-option"
                    onClick={() => selectCourse(course, index)}
                  >
                    {course}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

*/
