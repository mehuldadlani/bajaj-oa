import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import ResponseDisplay from './components/ResponseDisplay';
import styles from './App.module.css';

function App() {
  const [response, setResponse] = useState(null);

  const apkDownloadUrl = "https://drive.google.com/file/d/1cp5A-JKkrhaX009NG5OFnkVxSm7_6ist/view?usp=sharing";

 return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Bajaj Finserv Health Dev Challenge</h1>
        <a 
          href={apkDownloadUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.downloadButton}
        >
          <FaDownload className={styles.icon} />
          <span>Download App</span>
          <FaMobileAlt className={styles.icon} />
        </a>
      </header>
      <main className={styles.container}>
        <JsonInput setResponse={setResponse} />
        {response && <ResponseDisplay response={response} />}
      </main>
      <footer className={styles.footer}>
        <p>© 2023 Bajaj Finserv Health. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
