// components/academic-pathway.js
import React from 'react';
import styles from '../styles/academic-pathway.module.css'; // Make sure the path is correct

const AcademicPathway = ({ courses, removeCourse }) => {
  // If all courses have the same term, we can take the term from the first course.
  // If the term varies, you would need to adjust this logic accordingly.
  const courseTerm = courses.length > 0 ? courses[0].term : 'No Term Set';

  // Fill the remaining blocks if courses are fewer than 5
  const emptyBlocks = 5 - courses.length;
  const courseBlocks = [...courses, ...Array(emptyBlocks).fill({})];

  return (
    <>
      <div className={styles.pathwayHeader}>Academic Pathway</div>
      <div className={styles.academicPathway}>
        <div className={styles.courseTermContainer}>{courseTerm}</div>
        <div className={styles.coursesContainer}>
          {courseBlocks.map((course, index) => (
            <div key={index} className={styles.courseBlock}>
              {course.name ? (
                <>
                  <div className={styles.courseName}>{course.name}</div>
                  <div className={styles.courseTerm}>{course.term}</div>
                  <button 
                    className={styles.deleteButton} 
                    onClick={() => removeCourse(course.name)}
                  >
                    X
                  </button>
                </>
              ) : (
                <div className={styles.courseName}></div> // Placeholder for empty blocks
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AcademicPathway;
