import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import ResponseDisplay from './components/ResponseDisplay';
import styles from './App.module.css';

function App() {
  const [response, setResponse] = useState(null);

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Bajaj Finserv Health Dev Challenge</h1>
      <div className={styles.container}>
        <JsonInput setResponse={setResponse} />
        {response && <ResponseDisplay response={response} />}
      </div>
    </div>
  );
}

export default App;