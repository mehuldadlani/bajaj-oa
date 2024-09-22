import React, { useState } from 'react';
import axios from 'axios';
import styles from './JsonInput.module.css';

const JsonInput = ({ setResponse }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const parsedInput = JSON.parse(input);
      const res = await axios.post('https://bajaj-oa-pied.vercel.app/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter JSON here..."
        className={styles.textarea}
      />
      <button type="submit" className={styles.button}>Submit</button>
      {error && <p className={styles.error}>{error}</p>}
    </form>
  );
};

export default JsonInput;