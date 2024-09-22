import React, { useState } from 'react';
import Select from 'react-select';
import styles from './ResponseDisplay.module.css';

const options = [
  { value: 'alphabets', label: 'Alphabets' },
  { value: 'numbers', label: 'Numbers' },
  { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' },
];

const ResponseDisplay = ({ response }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    let displayData = {};
    selectedOptions.forEach(option => {
      if (response[option.value]) {
        displayData[option.value] = response[option.value];
      }
    });
    return <pre>{JSON.stringify(displayData, null, 2)}</pre>;
  };

  return (
    <div className={styles.container}>
      <Select
        options={options}
        isMulti
        onChange={handleChange}
        className={styles.select}
        placeholder="Select data to display..."
      />
      <div className={styles.response}>
        {renderResponse()}
      </div>
    </div>
  );
};

export default ResponseDisplay;