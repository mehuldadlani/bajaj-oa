import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import ResponseDisplay from './components/ResponseDisplay';
import styles from './App.module.css';

function App() {
  const [response, setResponse] = useState(null);

  const apkDownloadUrl = "https://drive.google.com/file/d/1cp5A-JKkrhaX009NG5OFnkVxSm7_6ist/view?usp=sharing";

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Bajaj Finserv Health Dev Challenge</h1>
      <div className={styles.container}>
        <JsonInput setResponse={setResponse} />
        {response && <ResponseDisplay response={response} />}
      </div>
      <div className={styles.downloadContainer}>
        <a 
          href={apkDownloadUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.downloadButton}
        >
          Download Mobile App
        </a>
      </div>
    </div>
  );
}

export default App;
