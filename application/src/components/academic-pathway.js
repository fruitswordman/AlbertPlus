// components/academic-pathway.js
import React from 'react';
import styles from '../styles/academic-pathway.module.css'; // Make sure the path is correct

const AcademicPathway = ({ courses, removeCourse }) => {
  // Fill the remaining blocks if courses are fewer than 5
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
  );
};

export default AcademicPathway;