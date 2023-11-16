import styles from '../styles/search-results.module.css';
import React from 'react';

const SearchResults = ({ results, onResultClick }) => {
  return (
    <div className={styles.searchResults}>
      {results.map((result, index) => (
        <button className={styles.resultTag} key={index} onClick={() => onResultClick(result)}>
          {result}
        </button>
      ))}
    </div>
  );
};

export default SearchResults;